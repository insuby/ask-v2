// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

library Utils {
    uint256 constant ONE = 1E18;

    enum DealState {
        BuyerWaiting,
        SellerWaiting,
        GarantWaiting,
        InProgress,
        InReview,
        InDispute,
        Done,
        Resolved,
        Canceled
    }

    enum DealRole {
        Buyer,
        Seller,
        Garant
    }

    enum Error {
        InvalidToken,
        InvalidTreasury,
        InvalidState,
        DealAlreadyExists,
        DealNotExists,
        InvalidBuyerAddress,
        InvalidGarantAddress,
        InvalidSellerAddress,
        SellerAddressIsNotDefined,
        BuyerAddressIsNotDefined,
        GarantAddressIsNotDefined,
        DealAlreadyCanceled,
        DealInProgress,
        InvalidTransferAmount,
        NoAccess
    }
}
