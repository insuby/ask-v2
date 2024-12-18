import styles from './styles.module.scss'

import { NotificationItem } from '@components'
import { useI18n } from '@i18n'
import { useCryptoStore } from '@store'
import { NotificationState } from '@types'
import { useMemo, useRef } from 'react'

interface MobileNotificationsProps {
  page: string
  setMenu: (b: boolean) => void
}
const MobileNotifications = ({ page, setMenu }: MobileNotificationsProps) => {
  const i18n = useI18n()
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const { notificationList } = useCryptoStore((state) => state)

  const unreadNotificationList = useMemo<NotificationState[]>(
    () => notificationList.filter(({ read }: NotificationState) => !read),
    [notificationList],
  )
  return (
    <div
      className={page === 'Notifications' ? styles.container : styles.hidden}
    >
      <div className={styles.notificationList}>
        {unreadNotificationList.map((notification) => {
          return (
            <NotificationItem
              setMenu={setMenu}
              {...notification}
              key={notification.trxId}
            />
          )
        })}
      </div>
    </div>
  )
}

export default MobileNotifications
