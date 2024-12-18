import styles from './styles.module.scss'

import { Button } from '@components'
import { PageStatusIcons, PageStatusText } from '@constants'
import { useI18n } from '@i18n'
import { useUiStore } from '@store'
import { ButtonTypes, PageStatusesEnum } from '@types'
import { FC } from 'react'

interface PageStatusesProps {
  status: PageStatusesEnum
}

const PageStatus: FC<PageStatusesProps> = ({ status }) => {
  const i18n = useI18n()
  const { openAuthModal } = useUiStore((state) => state)

  return (
    <div className={styles.status}>
      <div
        className={
          status === PageStatusesEnum.notFound ? styles.notFound : styles.image
        }
      >
        {PageStatusIcons[status]}
      </div>
      <h2>{i18n.t(PageStatusText[status].topText)}</h2>
      <p>{i18n.t(PageStatusText[status].bottomText)}</p>
      {status === PageStatusesEnum.connectWallet && (
        <Button
          className={styles.buttonAuth}
          buttonColor={ButtonTypes.gray}
          onClick={openAuthModal}
        >
          {i18n.t('pageStatus.connectWallet.button')}
        </Button>
      )}
    </div>
  )
}

export default PageStatus
