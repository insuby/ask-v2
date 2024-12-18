import {
  ArbiterWaitingStateIcon,
  CanceledStateIcon,
  DoneStateIcon,
  InDisputeStateIcon,
  InProgressStateIcon,
  InReviewStateIcon,
  NoFoundErrorIcon,
  NoInternetIcon,
  ResolvedStateIcon,
  ServerErrorIcon,
  SomethingWentWrongIcon,
  TakerWaitingStateIcon,
  WalletIcon,
} from '@icons'
import { DealState } from '@tron'
import { PageStatusesEnum } from '@types'

export const DealStateIcons = {
  [DealState.BuyerWaiting]: <TakerWaitingStateIcon />,
  [DealState.SellerWaiting]: <TakerWaitingStateIcon />,
  [DealState.GarantWaiting]: <ArbiterWaitingStateIcon />,
  [DealState.InProgress]: <InProgressStateIcon />,
  [DealState.InReview]: <InReviewStateIcon />,
  [DealState.InDispute]: <InDisputeStateIcon />,
  [DealState.Done]: <DoneStateIcon />,
  [DealState.Resolved]: <ResolvedStateIcon />,
  [DealState.Canceled]: <CanceledStateIcon />,
}

export const PageStatusIcons = {
  [PageStatusesEnum.noInternet]: <NoInternetIcon />,
  [PageStatusesEnum.serverError]: <ServerErrorIcon />,
  [PageStatusesEnum.somethingWrong]: <SomethingWentWrongIcon />,
  [PageStatusesEnum.notFound]: <NoFoundErrorIcon />,
  [PageStatusesEnum.connectWallet]: <WalletIcon />,
}

export const PageStatusText = {
  [PageStatusesEnum.noInternet]: {
    topText: 'pageStatus.noInternet.topText',
    bottomText: 'pageStatus.noInternet.bottomText',
  },
  [PageStatusesEnum.serverError]: {
    topText: 'pageStatus.serverError.topText',
    bottomText: 'pageStatus.serverError.bottomText',
  },
  [PageStatusesEnum.somethingWrong]: {
    topText: 'pageStatus.somethingWrong.topText',
    bottomText: 'pageStatus.somethingWrong.bottomText',
  },
  [PageStatusesEnum.notFound]: {
    topText: 'pageStatus.notFound.topText',
    bottomText: 'pageStatus.notFound.bottomText',
  },
  [PageStatusesEnum.connectWallet]: {
    topText: 'pageStatus.connectWallet.topText',
    bottomText: 'pageStatus.connectWallet.bottomText',
  },
}

export type ColumnType = {
  readonly name: string
  readonly id?: string
  readonly style: React.CSSProperties
}

export const TABLE_COLUMN: ColumnType[] = [
  { name: 'tableColumn.dateTime', style: { width: '20%' } },
  { name: 'tableColumn.id', style: { width: '20%' }, id: 'id' },
  { name: 'tableColumn.role', style: { width: '20%' }, id: 'role' },
  { name: 'tableColumn.amount', style: { width: '20%' } },
  { name: 'tableColumn.status', style: { width: '20%' } },
]
export const RATING_TABLE_COLUMN: ColumnType[] = [
  { name: 'tableColumn.n', style: { width: '10%' } },
  {
    name: 'tableColumn.walletNumber',
    style: { width: '20%' },
    id: 'wallet',
  },
  { name: 'tableColumn.all', style: { width: '20%' } },
  { name: 'tableColumn.successful', style: { width: '20%' }, id: 'successful' },
  { name: 'tableColumn.garant', style: { width: '20%' } },
]
