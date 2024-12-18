import { LoadingState } from '@store'
import type { DealInfo, DealRole, DealState } from '@tron'
import { TronWebService } from '@tron'

// Todo: Types for Button

export enum ButtonTypes {
  light = 'LIGHT',
  lilac = 'LILAC',
  dark = 'DARK',
  gray = 'GRAY',
  darkCyan = 'DARKCYAN',
  darkPink = 'DARKPINK',
  violet = 'VIOLET',
}

// Todo: Types fro PageStatuses

export enum PageStatusesEnum {
  notFound = 'NOT_FOUNDS',
  noInternet = 'NO_INTERNET',
  serverError = 'SERVER_ERROR',
  somethingWrong = 'SOMETHING_WRONG',
  connectWallet = 'CONNECT_WALLET',
}

// Todo: Types for UiStore

export enum ModalAction {
  VOID,
  CLOSE_MODAL,
  APPROVE_DEAL_BY_BUYER,
  APPROVE_DEAL_BY_TAKER,
  APPROVE_DEAL_BY_ARBITER,
  CANCEL_DEAL,
  RELEASE_DEAL,
  SEND_DEAL_TO_REVIEW,
  SEND_DEAL_TO_DISPUTE,
}

export type IUiStore = {
  // Auth Modal
  isAuthModalOpen: boolean
  openAuthModal: VoidFunction
  closeAuthModal: VoidFunction
  // Confirm Modal
  isConfirmModalOpen: boolean
  confirmModalAction: ModalAction
  confirmModalMessage?: string
  triggerConfirmModal: (message: string, action: ModalAction) => void
  closeConfirmModal: VoidFunction
  // Error
  errorMessage?: string
  setErrorMessage: (error: string) => void
  clearErrorMessage: VoidFunction
}

// Todo: Types for Create Page

export type CreateDealFormState = {
  makerAddress: string
  takerAddress: string
  arbiterAddress: string
  amount: number
  arbiterFeeInNormal: number
  arbiterFeeInDispute: number
  terms: string
  agents: { agent: string; fee: number }[]
}
export type CustomErrors = {
  [key: string]: { message: string }
}
// Todo: Types for cryptoStore

export type ProfileState = {
  address: string | null
  balanceUSDT: string | null
  balanceTRX: string | null
  network: string | null
}

export type DealInfoState = DealInfo

export type NotificationState = {
  type: DealState
  dealId: number
  title: string
  recipient: string
  date: number
  trxId: string
  read: boolean
  // Only for resolved event
  amount?: number
  amountToTaker?: number
  // Only for canceled event
  role?: DealRole
  initiatorAddress?: string
  setMenu?: (b: boolean) => void
}

export type ProfileSlice = {
  profile: ProfileState
  setProfile: (
    address: ProfileState['address'],
    tronWebService: TronWebService,
  ) => void
  resetProfile: () => void
}

export type DealInfoSlice = {
  dealInfo: DealInfoState | null
  dealInfoLoadingState: LoadingState
  fetchDealInfo: (
    payload: { id: number },
    tronWebService: TronWebService,
  ) => void
  silentUpdateDealInfo: (
    payload: { id: number },
    tronWebService: TronWebService,
  ) => void
  approveDealByBuyer: (
    payload: { id: number },
    tronWebService: TronWebService,
  ) => void
  approveDealByTaker: (
    payload: { id: number },
    tronWebService: TronWebService,
  ) => void
  approveDealByArbiter: (
    payload: { id: number },
    tronWebService: TronWebService,
  ) => void
  cancelDeal: (payload: { id: number }, tronWebService: TronWebService) => void
  releaseDeal: (payload: { id: number }, tronWebService: TronWebService) => void
  toDisputeDeal: (
    payload: { id: number },
    tronWebService: TronWebService,
  ) => void
  toReviewDeal: (
    payload: { id: number },
    tronWebService: TronWebService,
  ) => void
  createDealInfoLoadingState: LoadingState
  createDealInfo: (
    payload: {
      isSellersRequest: boolean
      makerAddress: string
      takerAddress: string
      arbiterAddress: string
      amount: number
      serviceFee: number
      arbiterFeeInNormal: number
      arbiterFeeInDispute: number
      terms: string
      agents: [string, number][]
      totalAmount: number
    },
    tronWebService: TronWebService,
    fulfilledCallback?: (payload?: number) => void,
    failedCallback?: VoidFunction,
  ) => void
  setDealInfo: (dealInfo: DealInfoState) => void
  resetDealInfo: () => void
}

export type DealListSlice = {
  dealInfoListLoadingState: LoadingState
  dealInfoList: DealInfoState[]
  dealInfoTotalCount: number
  dealInfoLimit: number
  dealInfoOffset: number
  setDealInfoOffset: (offset: number) => void
  fetchDealInfoList: (tronWebService: TronWebService) => void
  silentUpdateDealInfoList: (tronWebService: TronWebService) => void
  setDealList: (dealList: DealInfoState[]) => void
  sortDealInfoList: (sortType: string) => void
}

export type NotificationSlice = {
  notificationList: NotificationState[]
  addNotification: (notification: NotificationState) => void
  addOrReplaceNotification: (notification: NotificationState) => void
  readNotification: (trxId: string, type: DealState) => void
}

export type ICryptoStore = ProfileSlice &
  DealInfoSlice &
  DealListSlice &
  NotificationSlice
