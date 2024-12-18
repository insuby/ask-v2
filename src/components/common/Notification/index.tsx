import styles from './styles.module.scss'

import { NotificationItem } from '@components'
import { useClickOutside } from '@hooks'
import { useI18n } from '@i18n'
import { NotificationIcon } from '@icons'
import { useCryptoStore } from '@store'
import type { NotificationState } from '@types'
import classNames from 'classnames'
import { FC, useMemo, useRef, useState } from 'react'

const Notification: FC = () => {
  const i18n = useI18n()
  const [showList, setShowList] = useState(false)
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const { notificationList } = useCryptoStore((state) => state)
  useClickOutside(wrapperRef, () => setShowList(false))

  const toggleList = () => {
    setShowList(!showList)
  }

  const unreadNotificationList = useMemo<NotificationState[]>(
    () => notificationList.filter(({ read }: NotificationState) => !read),
    [notificationList],
  )

  return (
    <div ref={wrapperRef} className={styles.notificationContainer}>
      <div
        className={classNames(styles.notificationButton, {
          [styles.active]: showList,
        })}
        onClick={toggleList}
      >
        <NotificationIcon height={'19px'} width={'19px'} />
      </div>

      {showList && (
        <div className={styles.notificationList}>
          <div className={styles.header}>
            <h3 className={styles.title}>{i18n.t('notification.title')}</h3>
            <span className={styles.amount}>
              ({unreadNotificationList.length})
            </span>
          </div>
          {unreadNotificationList.map((notification) => {
            return (
              <NotificationItem {...notification} key={notification.trxId} />
            )
          })}
        </div>
      )}
    </div>
  )
}

export default Notification
