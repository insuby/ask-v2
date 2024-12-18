import styles from './styles.module.scss'

import { dealStateFormatter } from '@common'
import { DealStateIcons } from '@constants'
import { useI18n } from '@i18n'
import { DealState } from '@tron'
import classNames from 'classnames'
import { FC } from 'react'

interface DealStateInfoProps {
  value: DealState
}

const DealStateInfo: FC<DealStateInfoProps> = ({ value }) => {
  const i18n = useI18n()

  const dealStateKey = dealStateFormatter(value)

  return (
    <div
      className={classNames(styles.status, {
        [styles.takerWaiting]: value === DealState.SellerWaiting,
        [styles.arbiterWaiting]: value === DealState.GarantWaiting,
        [styles.inProgress]: value === DealState.InProgress,
        [styles.inReview]: value === DealState.InReview,
        [styles.inDispute]: value === DealState.InDispute,
        [styles.done]: value === DealState.Done,
        [styles.resolved]: value === DealState.Resolved,
        [styles.canceled]: value === DealState.Canceled,
      })}
    >
      {DealStateIcons[value]}
      <span>{dealStateKey && i18n.t(dealStateKey)}</span>
    </div>
  )
}

export default DealStateInfo
