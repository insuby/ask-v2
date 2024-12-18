import { DealRole } from '@tron'

export type TronContractEventPayload = {
  recipient: string
  dealId: string
}

export type TronContractEventPayloadResolved = TronContractEventPayload & {
  amount: string
  amountToSeller: string
}

export type TronContractEventPayloadCanceled = TronContractEventPayload & {
  role: DealRole
  initiatorAddress: string
}

export type TronContractEvent = {
  block: number
  timestamp: number
  contract: string
  name: string
  transaction: string
  result: TronContractEventPayload
  resourceNode: string
}
