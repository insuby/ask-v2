import type {
  Adapter,
  Transaction,
} from '@tronweb3/tronwallet-abstract-adapter'

import { ABI } from './contract/abi'
import { TOKEN_ABI } from './contract/tokenAbi'
import type { DealInfo } from './model'
import TronWebServiceMapper from './tronWebServiceMapper'
import { config } from '@config'
import { TronWeb } from 'tronweb'
//@ts-expect-error
import type { TronContract } from 'tronweb/interfaces'

class TronWebService {
  private contract?: TronContract
  private tokenContract?: TronContract
  private mapper: TronWebServiceMapper
  readonly tronWeb: TronWeb

  constructor(
    readonly adapter: Adapter & { address: string },
    private readonly contractAddress: string,
    private readonly tokenAddress: string,
  ) {
    this.tronWeb = new TronWeb({
      fullHost: config.node,
    })

    if (typeof window.tronWeb === 'object' && window.tronLink) {
      // @ts-expect-error
      this.tronWeb = window.tronWeb
    }

    this.tronWeb.setAddress(this.adapter.address)
    this.mapper = new TronWebServiceMapper(this.tronWeb)
  }

  getContract = async (): Promise<TronContract> => {
    if (this.contract) {
      return this.contract
    }

    this.contract = this.tronWeb.contract(ABI, this.contractAddress)

    return this.contract as TronContract
  }

  getTokenContract = async (): Promise<TronContract> => {
    if (this.tokenContract) {
      return this.tokenContract
    }

    this.tokenContract = this.tronWeb.contract(TOKEN_ABI, this.tokenAddress)

    return this.tokenContract as TronContract
  }

  getDefaultAddress = (): string => {
    this.tronWeb.setAddress(this.adapter.address)
    return this.tronWeb.defaultAddress.base58 as string
  }

  getTRXBalance = async (converted = true): Promise<number> => {
    const balance = await this.tronWeb.trx.getBalance(this.getDefaultAddress())
    return !converted ? +balance : +this.tronWeb.fromSun(balance)
  }

  getUSDTBalance = async () => {
    const address = this.getDefaultAddress()
    if (!address) return 0

    const contract = await this.getTokenContract()
    const balance = await contract.methods.balanceOf(address).call()
    return balance.toNumber() * 10 ** -6
  }

  getBalance = async (): Promise<[number, number]> => {
    const [balanceTRX, balanceUSDT] = await Promise.all([
      this.getTRXBalance(),
      this.getUSDTBalance(),
    ])
    return [balanceTRX, balanceUSDT]
  }

  getDeal = async (id: number): Promise<DealInfo> => {
    const contract = await this.getContract()
    const response = await contract.methods.getDealDetails(id.toString()).call()

    return this.mapper.toDealInfo(response.deal, this.getDefaultAddress())
  }

  getDealList = async (): Promise<DealInfo[]> => {
    const contract = await this.getContract()
    const resultList = await Promise.all([
      contract.methods.getDealList(0, this.adapter.address, 0, 100).call(),
      contract.methods.getDealList(1, this.adapter.address, 0, 100).call(),
      contract.methods.getDealList(2, this.adapter.address, 0, 100).call(),
    ]).then((r) =>
      r.reduce((prev: [], next: any) => prev.concat(next.list), []),
    )

    return resultList.map((item: DealInfo) =>
      this.mapper.toDealInfo(item, this.adapter.address),
    )
  }

  getDealsCount = async (): Promise<number> => {
    const contract = await this.getContract()

    return await Promise.all([
      contract.methods.getDealList(0, this.adapter.address, 0, 100).call(),
      contract.methods.getDealList(1, this.adapter.address, 0, 100).call(),
      contract.methods.getDealList(2, this.adapter.address, 0, 100).call(),
    ]).then((r) =>
      r.reduce((prev: number, next: any) => prev + next.total.toNumber(), 0),
    )
  }

  estimateServiceFee = async (dealSum: number): Promise<number> => {
    if (!dealSum) return 0
    const contract = await this.getContract()

    const result = await contract.methods
      .estimateServiceFee(dealSum * 10 ** 6)
      .call()

    return result.toNumber() * 10 ** -6
  }

  signAndSendTransaction = async (tx: Transaction) => {
    const signedTransaction = await this.adapter.signTransaction(tx)
    // @ts-expect-error
    await this.tronWeb.trx.sendRawTransaction(signedTransaction)
  }

  approveTokens = async (amount: number) => {
    const { transaction } =
      await this.tronWeb.transactionBuilder.triggerSmartContract(
        this.tronWeb.address.toHex(this.tokenAddress),
        'approve(address,uint256)',
        { callValue: 0 },
        [
          { type: 'address', value: this.contractAddress },
          {
            type: 'uint256',
            value: amount * 10 ** 6,
          },
        ],
        this.getDefaultAddress(),
      )

    return await this.signAndSendTransaction(
      transaction as unknown as Transaction,
    )
  }

  createDeal = async (
    isSellersRequest: boolean,
    id: number,
    buyerAddress: string,
    sellerAddress: string,
    garantAddress: string,
    amount: number,
    garantFeeInNormal: number,
    garantFeeInDispute: number,
    terms = '',
    agents: [string, number][],
  ) => {
    const formattedAgents = agents.map(([agent, fee]) => [
      this.tronWeb.address.toHex(agent),
      fee * 10 ** 6,
    ])

    const funcABIV2 = {
      inputs: [
        {
          components: [
            { internalType: 'bool', name: 'isSellerRequest', type: 'bool' },
            { internalType: 'uint256', name: 'dealId', type: 'uint256' },
            { internalType: 'uint256', name: 'amount', type: 'uint256' },
            { internalType: 'uint256', name: 'disputeFee', type: 'uint256' },
            { internalType: 'uint256', name: 'successFee', type: 'uint256' },
            { internalType: 'address', name: 'buyer', type: 'address' },
            { internalType: 'address', name: 'seller', type: 'address' },
            { internalType: 'address', name: 'garant', type: 'address' },
            { internalType: 'address', name: 'token', type: 'address' },
            {
              components: [
                { internalType: 'address', name: 'agent', type: 'address' },
                { internalType: 'uint256', name: 'fee', type: 'uint256' },
              ],
              internalType: 'struct DealsController.Agent[]',
              name: 'agents',
              type: 'tuple[]',
            },
            { internalType: 'string', name: 'terms', type: 'string' },
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
    }

    const parametersV2 = [
      [
        isSellersRequest,
        id,
        amount * 10 ** 6,
        garantFeeInDispute * 10 ** 6,
        garantFeeInNormal * 10 ** 6,
        this.tronWeb.address.toHex(buyerAddress),
        this.tronWeb.address.toHex(sellerAddress),
        this.tronWeb.address.toHex(garantAddress),
        this.tronWeb.address.toHex(this.tokenAddress),
        formattedAgents,
        terms,
      ],
    ]

    const { transaction } =
      await this.tronWeb.transactionBuilder.triggerSmartContract(
        this.tronWeb.address.toHex(this.contractAddress),
        'createDeal((bool,uint256,uint256,uint256,uint256,address,address,address,address,(address,uint256)[],string))',
        {
          callValue: 0,
          feeLimit: 300_000_000,
          funcABIV2,
          parametersV2,
        },
        [],
        this.getDefaultAddress(),
      )

    return await this.signAndSendTransaction(
      transaction as unknown as Transaction,
    )
  }

  approveByGarant = async (id: number) => {
    const { transaction } =
      await this.tronWeb.transactionBuilder.triggerSmartContract(
        this.tronWeb.address.toHex(this.contractAddress),
        'approveByGarant(uint256)',
        { callValue: 0 },
        [{ type: 'uint256', value: id }],
        this.getDefaultAddress(),
      )

    return await this.signAndSendTransaction(
      transaction as unknown as Transaction,
    )
  }

  approveByBuyer = async (id: number) => {
    const { transaction } =
      await this.tronWeb.transactionBuilder.triggerSmartContract(
        this.tronWeb.address.toHex(this.contractAddress),
        'approveByBuyer(uint256)',
        { callValue: 0 },
        [{ type: 'uint256', value: id }],
        this.getDefaultAddress(),
      )

    return await this.signAndSendTransaction(
      transaction as unknown as Transaction,
    )
  }

  approveBySeller = async (id: number) => {
    const { transaction } =
      await this.tronWeb.transactionBuilder.triggerSmartContract(
        this.tronWeb.address.toHex(this.contractAddress),
        'approveBySeller(uint256)',
        { callValue: 0 },
        [{ type: 'uint256', value: id }],
        this.getDefaultAddress(),
      )

    return await this.signAndSendTransaction(
      transaction as unknown as Transaction,
    )
  }

  cancel = async (id: number) => {
    const { transaction } =
      await this.tronWeb.transactionBuilder.triggerSmartContract(
        this.tronWeb.address.toHex(this.contractAddress),
        'cancel(uint256)',
        { callValue: 0 },
        [{ type: 'uint256', value: id }],
        this.getDefaultAddress(),
      )

    return await this.signAndSendTransaction(
      transaction as unknown as Transaction,
    )
  }

  releaseDeal = async (id: number) => {
    const { transaction } =
      await this.tronWeb.transactionBuilder.triggerSmartContract(
        this.tronWeb.address.toHex(this.contractAddress),
        'releaseDeal(uint256)',
        { callValue: 0 },
        [{ type: 'uint256', value: id }],
        this.getDefaultAddress(),
      )

    return await this.signAndSendTransaction(
      transaction as unknown as Transaction,
    )
  }

  resolveDispute = async (id: number, amountToSeller: number) => {
    const { transaction } =
      await this.tronWeb.transactionBuilder.triggerSmartContract(
        this.tronWeb.address.toHex(this.contractAddress),
        'resolveDispute(uint256,uint256)',
        { callValue: 0 },
        [
          { type: 'uint256', value: id },
          {
            type: 'uint256',
            value: amountToSeller * 10 ** 6,
          },
        ],
        this.getDefaultAddress(),
      )

    return await this.signAndSendTransaction(
      transaction as unknown as Transaction,
    )
  }

  toDispute = async (id: number) => {
    const { transaction } =
      await this.tronWeb.transactionBuilder.triggerSmartContract(
        this.tronWeb.address.toHex(this.contractAddress),
        'toDispute(uint256)',
        { callValue: 0 },
        [{ type: 'uint256', value: id }],
        this.getDefaultAddress(),
      )

    return await this.signAndSendTransaction(
      transaction as unknown as Transaction,
    )
  }

  toReview = async (id: number) => {
    const { transaction } =
      await this.tronWeb.transactionBuilder.triggerSmartContract(
        this.tronWeb.address.toHex(this.contractAddress),
        'toReview(uint256)',
        { callValue: 0 },
        [{ type: 'uint256', value: id }],
        this.getDefaultAddress(),
      )

    return await this.signAndSendTransaction(
      transaction as unknown as Transaction,
    )
  }
}

export default TronWebService
