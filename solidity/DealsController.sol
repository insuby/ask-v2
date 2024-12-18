// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./Utils.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";

contract DealsController is Initializable, AccessControlUpgradeable {
    using SafeERC20 for IERC20;

    error CommonError(Utils.Error code);

    event StatusChanged(uint256 indexed id, Utils.DealState state);

    struct Agent {
        address agent;
        uint256 fee;
    }

    struct DealListResult {
        DealDetails[] list;
        uint256 total;
    }

    struct NewDeal {
        bool isSellerRequest;
        uint256 dealId;
        uint256 amount;
        uint256 disputeFee;
        uint256 successFee;
        address buyer;
        address seller;
        address garant;
        address token;
        Agent[] agents;
        string terms;
    }

    struct DealDetails {
        uint256 id;
        uint256 createdAt;
        uint256 amount;
        uint256 disputeFee;
        uint256 successFee;
        uint256 serviceFee;
        address buyer;
        address seller;
        address garant;
        address token;
        Utils.DealState state;
        Agent[] agents;
        string terms;
    }

    struct DealsStorage {
        uint256 idCounter;
        uint256 serviceFeeShare;
        address treasury;
        mapping(uint256 => DealDetails) deals;
        mapping(Utils.DealRole role => mapping(address participant => uint256[] dealId)) dealParticipantMap;
    }

    bytes32 public constant TREASURY_OPERATOR_ROLE =
        keccak256("TREASURY_OPERATOR_ROLE");

    //keccak256(abi.encode(uint256(keccak256("deals.storage.controller")) - 1)) & ~bytes32(uint256(0xff));
    bytes32 private constant DealsControllerLocation =
        0xb2aef20a9dfa682c52fbf11cd34667b43616b007bcae938853319f29d7504b00;

    function _getDealsStorage() private pure returns (DealsStorage storage $) {
        assembly {
            $.slot := DealsControllerLocation
        }
    }

    function initialize(
        address treasuryOperator,
        address treasury,
        uint256 serviceFeeShare
    ) public initializer {
        __AccessControl_init();

        _grantRole(DEFAULT_ADMIN_ROLE, _msgSender());
        _grantRole(TREASURY_OPERATOR_ROLE, treasuryOperator);

        _getDealsStorage().idCounter = 0;
        _getDealsStorage().treasury = treasury;
        _getDealsStorage().serviceFeeShare = serviceFeeShare;
    }

    modifier onlyOnState(uint256 id, Utils.DealState state) {
        if (_getDealsStorage().deals[id].state != state) {
            revert CommonError(Utils.Error.InvalidState);
        }
        _;
    }

    modifier onlyExistsDeal(uint256 id) {
        if (_getDealsStorage().deals[id].id == 0) {
            revert CommonError(Utils.Error.DealNotExists);
        }
        _;
    }

    function getTreasury() public view returns (address) {
        return _getDealsStorage().treasury;
    }

    function setTreasury(
        address newTreasury
    ) public onlyRole(TREASURY_OPERATOR_ROLE) {
        _revertIfZeroAddress(newTreasury, Utils.Error.InvalidTreasury);
        _getDealsStorage().treasury = newTreasury;
    }

    function transferTreasuryOperatorRole(
        address account
    ) public onlyRole(TREASURY_OPERATOR_ROLE) {
        _grantRole(TREASURY_OPERATOR_ROLE, account);
        _revokeRole(TREASURY_OPERATOR_ROLE, _msgSender());
    }

    function createDeal(NewDeal calldata newDeal) external {
        DealDetails storage deal = _getDealsStorage().deals[newDeal.dealId];

        if (deal.createdAt != 0) {
            revert CommonError(Utils.Error.DealAlreadyExists);
        }

        _revertIfZeroAddress(newDeal.seller, Utils.Error.InvalidSellerAddress);
        _revertIfZeroAddress(newDeal.buyer, Utils.Error.InvalidBuyerAddress);
        _revertIfZeroAddress(newDeal.garant, Utils.Error.InvalidGarantAddress);
        _revertIfZeroAddress(newDeal.token, Utils.Error.InvalidToken);

        if ((!newDeal.isSellerRequest && newDeal.buyer != _msgSender())) {
            revert CommonError(Utils.Error.InvalidBuyerAddress);
        }

        if (
            newDeal.seller == newDeal.garant ||
            newDeal.buyer == newDeal.garant ||
            _msgSender() == newDeal.garant
        ) {
            revert CommonError(Utils.Error.InvalidGarantAddress);
        }

        deal.id = newDeal.dealId;
        deal.createdAt = block.timestamp;
        deal.amount = newDeal.amount;
        deal.disputeFee = newDeal.disputeFee;
        deal.successFee = newDeal.successFee;
        deal.serviceFee = estimateServiceFee(newDeal.amount);
        deal.buyer = newDeal.buyer;
        deal.seller = newDeal.seller;
        deal.garant = newDeal.garant;
        deal.token = newDeal.token;
        deal.terms = newDeal.terms;
        deal.state = newDeal.isSellerRequest
            ? Utils.DealState.BuyerWaiting
            : Utils.DealState.SellerWaiting;

        for (uint256 i = 0; i < newDeal.agents.length; i++) {
            deal.agents.push(
                Agent({
                    agent: newDeal.agents[i].agent,
                    fee: newDeal.agents[i].fee
                })
            );
        }

        if (!newDeal.isSellerRequest) {
            uint256 totalAmount = _getDealSum(deal);

            IERC20(deal.token).transferFrom(
                deal.buyer,
                address(this),
                totalAmount
            );
        }

        _getDealsStorage()
        .dealParticipantMap[Utils.DealRole.Buyer][newDeal.buyer].push(
                newDeal.dealId
            );

        _getDealsStorage()
        .dealParticipantMap[Utils.DealRole.Seller][newDeal.seller].push(
                newDeal.dealId
            );

        _getDealsStorage()
        .dealParticipantMap[Utils.DealRole.Garant][newDeal.garant].push(
                newDeal.dealId
            );

        emit StatusChanged(newDeal.dealId, deal.state);
    }

    function getDealDetails(
        uint256 id
    ) external view returns (DealDetails memory deal) {
        deal = _getDealsStorage().deals[id];
    }

    function approveByBuyer(
        uint256 id
    )
        external
        onlyExistsDeal(id)
        onlyOnState(id, Utils.DealState.BuyerWaiting)
    {
        DealDetails storage deal = _getDealsStorage().deals[id];

        if (deal.buyer != _msgSender()) {
            revert CommonError(Utils.Error.NoAccess);
        }

        deal.state = Utils.DealState.GarantWaiting;

        uint256 totalAmount = _getDealSum(deal);

        IERC20(deal.token).transferFrom(deal.buyer, address(this), totalAmount);

        emit StatusChanged(id, deal.state);
    }

    function approveBySeller(
        uint256 id
    )
        external
        onlyExistsDeal(id)
        onlyOnState(id, Utils.DealState.SellerWaiting)
    {
        DealDetails storage deal = _getDealsStorage().deals[id];

        if (deal.seller != _msgSender()) {
            revert CommonError(Utils.Error.NoAccess);
        }

        deal.state = Utils.DealState.GarantWaiting;

        emit StatusChanged(id, deal.state);
    }

    function approveByGarant(
        uint256 id
    )
        external
        onlyExistsDeal(id)
        onlyOnState(id, Utils.DealState.GarantWaiting)
    {
        DealDetails storage deal = _getDealsStorage().deals[id];

        if (deal.garant != _msgSender()) {
            revert CommonError(Utils.Error.NoAccess);
        }

        deal.state = Utils.DealState.InProgress;

        emit StatusChanged(id, deal.state);
    }

    function cancel(uint256 id) external onlyExistsDeal(id) {
        DealDetails storage deal = _getDealsStorage().deals[id];

        if (deal.state == Utils.DealState.Canceled) {
            revert CommonError(Utils.Error.DealAlreadyCanceled);
        }

        bool hasAccessToOperation = _msgSender() == deal.buyer &&
            (deal.state == Utils.DealState.SellerWaiting ||
                deal.state == Utils.DealState.GarantWaiting);

        hasAccessToOperation =
            hasAccessToOperation ||
            (_msgSender() == deal.seller &&
                (deal.state == Utils.DealState.SellerWaiting ||
                    deal.state == Utils.DealState.InProgress));

        hasAccessToOperation =
            hasAccessToOperation ||
            (_msgSender() == deal.garant &&
                deal.state == Utils.DealState.GarantWaiting);

        if (!hasAccessToOperation) {
            revert CommonError(Utils.Error.NoAccess);
        }

        deal.state = Utils.DealState.Canceled;

        IERC20(deal.token).transfer(deal.buyer, _getDealSum(deal));

        emit StatusChanged(id, deal.state);
    }

    function toReview(
        uint256 id
    ) external onlyExistsDeal(id) onlyOnState(id, Utils.DealState.InProgress) {
        DealDetails storage deal = _getDealsStorage().deals[id];

        if (deal.seller != _msgSender()) {
            revert CommonError(Utils.Error.NoAccess);
        }

        deal.state = Utils.DealState.InReview;

        emit StatusChanged(id, deal.state);
    }

    function releaseDeal(
        uint256 id
    ) external onlyExistsDeal(id) onlyOnState(id, Utils.DealState.InReview) {
        DealDetails storage deal = _getDealsStorage().deals[id];

        if (deal.buyer != _msgSender()) {
            revert CommonError(Utils.Error.NoAccess);
        }

        deal.state = Utils.DealState.Done;

        if (deal.disputeFee > deal.successFee) {
            IERC20(deal.token).transfer(
                deal.buyer,
                deal.disputeFee - deal.successFee
            );
        }

        IERC20(deal.token).transfer(deal.garant, deal.successFee);
        IERC20(deal.token).transfer(deal.seller, deal.amount);

        IERC20(deal.token).transfer(
            _getDealsStorage().treasury,
            deal.serviceFee
        );

        for (uint256 i = 0; i < deal.agents.length; i++) {
            IERC20(deal.token).transfer(
                deal.agents[i].agent,
                deal.agents[i].fee
            );
        }

        emit StatusChanged(id, deal.state);
    }

    function toDispute(uint256 id) external {
        DealDetails storage deal = _getDealsStorage().deals[id];

        if (deal.buyer != _msgSender() && deal.seller != _msgSender()) {
            revert CommonError(Utils.Error.NoAccess);
        }

        if (
            deal.state != Utils.DealState.InProgress &&
            deal.state != Utils.DealState.InReview
        ) {
            revert CommonError(Utils.Error.InvalidState);
        }

        deal.state = Utils.DealState.InDispute;

        emit StatusChanged(id, deal.state);
    }

    function resolveDispute(
        uint256 id,
        uint256 compromise
    ) external onlyOnState(id, Utils.DealState.InDispute) {
        DealDetails storage deal = _getDealsStorage().deals[id];

        if (deal.garant != _msgSender()) {
            revert CommonError(Utils.Error.NoAccess);
        }

        if (deal.amount < compromise) {
            revert CommonError(Utils.Error.InvalidTransferAmount);
        }

        deal.state = Utils.DealState.Resolved;

        IERC20(deal.token).transfer(deal.garant, deal.disputeFee);
        IERC20(deal.token).transfer(
            _getDealsStorage().treasury,
            deal.serviceFee
        );

        if (compromise > 0) {
            IERC20(deal.token).transfer(deal.seller, compromise);
        }

        if (compromise < deal.amount) {
            uint256 returnedAmount = deal.amount - compromise;

            for (uint256 i = 0; i < deal.agents.length; i++) {
                returnedAmount += deal.agents[i].fee;
            }

            IERC20(deal.token).transfer(deal.buyer, returnedAmount);
        }

        if (deal.disputeFee < deal.successFee) {
            IERC20(deal.token).transfer(
                deal.buyer,
                deal.successFee - deal.disputeFee
            );
        }

        emit StatusChanged(id, deal.state);
    }

    function estimateServiceFee(uint256 dealSum) public view returns (uint256) {
        return (dealSum * _getDealsStorage().serviceFeeShare) / Utils.ONE;
    }

    function getDealList(
        Utils.DealRole role,
        address participant,
        uint256 skip,
        uint256 take
    ) external view returns (DealListResult memory) {
        DealDetails[] memory result = new DealDetails[](take);

        uint256[] memory dealIds = _getDealsStorage().dealParticipantMap[role][
            participant
        ];

        uint256 lastIndex = skip + take;

        for (uint256 i = skip; i < lastIndex; i++) {
            if (i >= dealIds.length) {
                break;
            }

            result[i - skip] = _getDealsStorage().deals[dealIds[i]];
        }

        return DealListResult({list: result, total: dealIds.length});
    }

    function setServiceFeeShare(
        uint256 share
    ) external onlyRole(TREASURY_OPERATOR_ROLE) {
        _getDealsStorage().serviceFeeShare = share;
    }

    function getServiceFeeShare() external view returns (uint256) {
        return _getDealsStorage().serviceFeeShare;
    }

    function _revertIfZeroAddress(
        address value,
        Utils.Error error
    ) private pure {
        if (value == address(0)) {
            revert CommonError(error);
        }
    }

    function _getDealSum(
        DealDetails memory deal
    ) private pure returns (uint256) {
        uint256 maxGarantFee = deal.disputeFee > deal.successFee
            ? deal.disputeFee
            : deal.successFee;

        uint256 agentFee = 0;
        for (uint256 i = 0; i < deal.agents.length; i++) {
            agentFee += deal.agents[i].fee;
        }

        return deal.amount + maxGarantFee + deal.serviceFee + agentFee;
    }
}
