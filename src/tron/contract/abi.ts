// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { JsonFragment } from '@daochild/tronweb-typescript/src/typings/interfaces'

export const ABI: JsonFragment[] = [
  {
    inputs: [],
    name: 'AccessControlBadConfirmation',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
      {
        internalType: 'bytes32',
        name: 'neededRole',
        type: 'bytes32',
      },
    ],
    name: 'AccessControlUnauthorizedAccount',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'enum Utils.Error',
        name: 'code',
        type: 'uint8',
      },
    ],
    name: 'CommonError',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidInitialization',
    type: 'error',
  },
  {
    inputs: [],
    name: 'NotInitializing',
    type: 'error',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint64',
        name: 'version',
        type: 'uint64',
      },
    ],
    name: 'Initialized',
    type: 'event',
    signature:
      '0xc7f505b2f371ae2175ee4913f4499e1f2633a7b5936321eed1cdaeb6115181d2',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32',
      },
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'previousAdminRole',
        type: 'bytes32',
      },
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'newAdminRole',
        type: 'bytes32',
      },
    ],
    name: 'RoleAdminChanged',
    type: 'event',
    signature:
      '0xbd79b86ffe0ab8e8776151514217cd7cacd52c909f66475c3af44e129f0b00ff',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
    ],
    name: 'RoleGranted',
    type: 'event',
    signature:
      '0x2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
    ],
    name: 'RoleRevoked',
    type: 'event',
    signature:
      '0xf6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'enum Utils.DealState',
        name: 'state',
        type: 'uint8',
      },
    ],
    name: 'StatusChanged',
    type: 'event',
    signature:
      '0x365a3d0a71be5f440c8224437355d5bd81a703759bf906e441902272bfbafcb3',
  },
  {
    inputs: [],
    name: 'DEFAULT_ADMIN_ROLE',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
    signature: '0xa217fddf',
  },
  {
    inputs: [],
    name: 'TREASURY_OPERATOR_ROLE',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
    signature: '0x5cc95ee8',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
    ],
    name: 'approveByBuyer',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',

    signature: '0x041b5dfb',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
    ],
    name: 'approveByGarant',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
    signature: '0x970df694',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
    ],
    name: 'approveBySeller',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
    signature: '0xa8645f9f',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
    ],
    name: 'cancel',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
    signature: '0x40e58ee5',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'bool',
            name: 'isSellerRequest',
            type: 'bool',
          },
          {
            internalType: 'uint256',
            name: 'dealId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'disputeFee',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'successFee',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'buyer',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'seller',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'garant',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'token',
            type: 'address',
          },
          {
            components: [
              {
                internalType: 'address',
                name: 'agent',
                type: 'address',
              },
              {
                internalType: 'uint256',
                name: 'fee',
                type: 'uint256',
              },
            ],
            internalType: 'struct DealsController.Agent[]',
            name: 'agents',
            type: 'tuple[]',
          },
          {
            internalType: 'string',
            name: 'terms',
            type: 'string',
          },
        ],
        internalType: 'struct DealsController.NewDeal',
        name: 'newDeal',
        type: 'tuple',
      },
    ],
    name: 'createDeal',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
    signature: '0x1269fcae',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'dealSum',
        type: 'uint256',
      },
    ],
    name: 'estimateServiceFee',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
    signature: '0x4960f1f6',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
    ],
    name: 'getDealDetails',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'createdAt',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'disputeFee',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'successFee',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'serviceFee',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'buyer',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'seller',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'garant',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'token',
            type: 'address',
          },
          {
            internalType: 'enum Utils.DealState',
            name: 'state',
            type: 'uint8',
          },
          {
            components: [
              {
                internalType: 'address',
                name: 'agent',
                type: 'address',
              },
              {
                internalType: 'uint256',
                name: 'fee',
                type: 'uint256',
              },
            ],
            internalType: 'struct DealsController.Agent[]',
            name: 'agents',
            type: 'tuple[]',
          },
          {
            internalType: 'string',
            name: 'terms',
            type: 'string',
          },
        ],
        internalType: 'struct DealsController.DealDetails',
        name: 'deal',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
    signature: '0xdbc23cf3',
  },
  {
    inputs: [
      {
        internalType: 'enum Utils.DealRole',
        name: 'role',
        type: 'uint8',
      },
      {
        internalType: 'address',
        name: 'participant',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'skip',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'take',
        type: 'uint256',
      },
    ],
    name: 'getDealList',
    outputs: [
      {
        components: [
          {
            components: [
              {
                internalType: 'uint256',
                name: 'id',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'createdAt',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'disputeFee',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'successFee',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'serviceFee',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'buyer',
                type: 'address',
              },
              {
                internalType: 'address',
                name: 'seller',
                type: 'address',
              },
              {
                internalType: 'address',
                name: 'garant',
                type: 'address',
              },
              {
                internalType: 'address',
                name: 'token',
                type: 'address',
              },
              {
                internalType: 'enum Utils.DealState',
                name: 'state',
                type: 'uint8',
              },
              {
                components: [
                  {
                    internalType: 'address',
                    name: 'agent',
                    type: 'address',
                  },
                  {
                    internalType: 'uint256',
                    name: 'fee',
                    type: 'uint256',
                  },
                ],
                internalType: 'struct DealsController.Agent[]',
                name: 'agents',
                type: 'tuple[]',
              },
              {
                internalType: 'string',
                name: 'terms',
                type: 'string',
              },
            ],
            internalType: 'struct DealsController.DealDetails[]',
            name: 'list',
            type: 'tuple[]',
          },
          {
            internalType: 'uint256',
            name: 'total',
            type: 'uint256',
          },
        ],
        internalType: 'struct DealsController.DealListResult',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
    signature: '0x919fb712',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32',
      },
    ],
    name: 'getRoleAdmin',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
    signature: '0x248a9ca3',
  },
  {
    inputs: [],
    name: 'getServiceFeeShare',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
    signature: '0x71da2789',
  },
  {
    inputs: [],
    name: 'getTreasury',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
    signature: '0x3b19e84a',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32',
      },
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'grantRole',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
    signature: '0x2f2ff15d',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32',
      },
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'hasRole',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
    signature: '0x91d14854',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'treasuryOperator',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'treasury',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'serviceFeeShare',
        type: 'uint256',
      },
    ],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
    signature: '0x1794bb3c',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
    ],
    name: 'releaseDeal',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
    signature: '0x505b6538',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32',
      },
      {
        internalType: 'address',
        name: 'callerConfirmation',
        type: 'address',
      },
    ],
    name: 'renounceRole',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
    signature: '0x36568abe',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'compromise',
        type: 'uint256',
      },
    ],
    name: 'resolveDispute',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
    signature: '0xbdc84ac3',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32',
      },
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'revokeRole',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
    signature: '0xd547741f',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'share',
        type: 'uint256',
      },
    ],
    name: 'setServiceFeeShare',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
    signature: '0xcaabdfc6',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newTreasury',
        type: 'address',
      },
    ],
    name: 'setTreasury',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
    signature: '0xf0f44260',
  },
  {
    inputs: [
      {
        internalType: 'bytes4',
        name: 'interfaceId',
        type: 'bytes4',
      },
    ],
    name: 'supportsInterface',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
    signature: '0x01ffc9a7',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
    ],
    name: 'toDispute',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
    signature: '0xc4749371',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
    ],
    name: 'toReview',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
    signature: '0x1ed3844c',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'transferTreasuryOperatorRole',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
    signature: '0xdb4d919e',
  },
]
