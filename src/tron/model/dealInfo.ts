import { DealRole, DealState, FeeInfo } from '@tron'

export type DealInfo = {
  id: number
  createdAt: number
  terms: string
  buyer: string
  seller: string
  garant: string
  token: string
  amount: number
  totalAmount: number
  feeInfo: FeeInfo
  state: DealState
  role?: DealRole
  agents: [string, number][]
}
