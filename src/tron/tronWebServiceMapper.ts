import { DealInfo, DealRole, DealState } from './model'
import {
  TronContractEvent,
  TronContractEventPayloadCanceled,
  TronContractEventPayloadResolved,
} from './model/event'
import { dealStateFromEventNameFormatter, eventMessageFormatter } from '@common'
import { NotificationState } from '@types'
import { TronWeb } from 'tronweb'

export default class TronWebServiceMapper {
  constructor(readonly tronWeb: TronWeb) {}

  toDealInfo(data: any, defaultAddress: string): DealInfo {
    const buyer = this.tronWeb.address.fromHex(data.buyer)
    const seller = this.tronWeb.address.fromHex(data.seller)
    const garant = this.tronWeb.address.fromHex(data.garant)

    const formattedAgents = data.agents.map(
      ([agent, fee]: [string, number]) => [
        this.tronWeb.address.fromHex(agent),
        this.tronWeb.toBigNumber(fee).toNumber() * 10 ** -6,
      ],
    )
    const amount = data.amount.toNumber() * 10 ** -6

    const garantFeeInNormal = data.successFee.toNumber() * 10 ** -6
    const garantFeeInDispute = data.disputeFee.toNumber() * 10 ** -6
    const serviceFee = +(data.serviceFee.toNumber() * 10 ** -6).toFixed(1)
    const formattedAgentsFee = Array.isArray(formattedAgents)
      ? formattedAgents.reduce((prev, next) => prev + +next[1], 0)
      : 0

    const totalAmount =
      amount +
      serviceFee +
      Math.max(garantFeeInNormal, garantFeeInDispute) +
      formattedAgentsFee

    return {
      id: data.id.toNumber(),
      createdAt: data.createdAt.toNumber(),
      terms: data.terms,
      buyer,
      seller,
      garant,
      token: this.tronWeb.address.fromHex(data.token),
      amount,
      totalAmount,
      feeInfo: {
        garantFeeInNormal,
        garantFeeInDispute,
        serviceFee,
        agentsFee: formattedAgentsFee,
      },
      state: data.state,
      agents: formattedAgents,
      role:
        defaultAddress === buyer
          ? DealRole.Buyer
          : defaultAddress === seller
          ? DealRole.Seller
          : defaultAddress === garant
          ? DealRole.Garant
          : undefined,
    }
  }

  toNotification(event: TronContractEvent): NotificationState | undefined {
    const dealId = Number(event.result.dealId)
    const recipient = event.result.recipient
    const title = eventMessageFormatter(event.name)
    const type = dealStateFromEventNameFormatter(event.name)

    if (!title || !type) return undefined

    let notification = {
      type: type,
      dealId: dealId,
      title: title,
      recipient: recipient,
      date: Math.round(event.timestamp / 1000),
      trxId: event.transaction,
      read: false,
    }

    if (type === DealState.Resolved) {
      const resolvedData = event.result as TronContractEventPayloadResolved
      notification = {
        ...notification,
        ...{
          amount: Number(resolvedData.amount),
          amountToSeller: Number(resolvedData.amountToSeller),
        },
      }
    }

    if (type === DealState.Canceled) {
      const canceledData = event.result as TronContractEventPayloadCanceled
      notification = {
        ...notification,
        ...{
          role: canceledData.role,
          initiatorAddress: canceledData.initiatorAddress,
        },
      }
    }

    return notification
  }
}
