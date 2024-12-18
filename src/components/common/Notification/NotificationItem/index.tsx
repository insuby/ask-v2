import styles from './styles.module.scss'

import { dateFromEpochFormatter } from '@common'
import { useI18n } from '@i18n'
import { useCryptoStore } from '@store'
import type { NotificationState } from '@types'
import { useRouter } from 'next/router'
import { useCallback } from 'react'

type NotificationProps = NotificationState

const NotificationItem = ({
  dealId,
  trxId,
  type,
  title,
  date,
  setMenu,
}: NotificationProps) => {
  const router = useRouter()
  const i18n = useI18n()
  const { readNotification } = useCryptoStore((state) => state)

  const onClickHandler = useCallback(() => {
    router.push(`/${dealId}/information`)
    readNotification(trxId, type)
    setMenu && setMenu(false)
  }, [dealId, trxId, type])

  return (
    <div className={styles.notificationItem} onClick={() => onClickHandler()}>
      <h4 className={styles.title}>{`${i18n.t(title)} (ID: ${dealId})`}</h4>
      <h5 className={styles.date}>{dateFromEpochFormatter(date)}</h5>
    </div>
  )
}

export default NotificationItem
