import styles from './styles.module.scss'

import { Button, CopyButton } from '@components'
import { useClickOutside } from '@hooks'
import { useI18n } from '@i18n'
import { TrashIcon } from '@icons'
import { useCryptoStore } from '@store'
import { ButtonTypes } from '@types'
import { useRef, useState } from 'react'

interface MobileWalletProps {
  page: string
  setPage: (page: string) => void
  exitModal: (modal: boolean) => void
}

const MobileWallet = ({ page, setPage, exitModal }: MobileWalletProps) => {
  const i18n = useI18n()
  const [_, setShowInfo] = useState<boolean>(false)
  const {
    profile: { address, network, balanceTRX, balanceUSDT },
    resetProfile,
  } = useCryptoStore()

  const wrapperRef = useRef<HTMLDivElement | null>(null)
  useClickOutside(wrapperRef, () => setShowInfo(false))

  const disconnectWalletHandler = () => {
    resetProfile()
    exitModal(false)
  }

  return (
    <div className={page === 'Wallet' ? styles.container : styles.hidden}>
      <div className={styles.profileInformationBlock}>
        <div className={styles.profileInfoRow}>
          <h4 className={styles.title}>{i18n.t('dropdown.wallet')}</h4>
          <div className={styles.addressBlock}>
            {/*<span>{longestStringFormatter(address ?? '')}</span>*/}
            <CopyButton currentAccount={address ?? ''} />
          </div>
        </div>
        <div className={styles.profileInfoRow}>
          <h4 className={styles.title}>{i18n.t('dropdown.network')}</h4>
          <div className={styles.networkBlock}>
            <span className={styles.dot}></span>
            <span>{network ?? 'Unknown'}</span>
          </div>
        </div>
        <div className={styles.balanceWallet}>
          <h4 className={styles.title}>{i18n.t('dropdown.balanceWallet')}</h4>
          <div className={styles.balance}>
            <span className={styles.countBalance}>
              {Number(balanceTRX)?.toFixed(1)}
            </span>
            <span className={styles.currency}>TRX</span>
          </div>
          <div className={styles.freezeActive}></div>
          <h4 className={styles.title}>{i18n.t('dropdown.balanceTRX')}</h4>
          <div className={styles.freeze}>
            <span className={styles.countBalance}>0</span>
            <span className={styles.currency}>USDT</span>
          </div>
        </div>
        <div className={styles.groupButton}>
          <Button
            buttonColor={ButtonTypes.darkPink}
            onClick={disconnectWalletHandler}
          >
            <TrashIcon />
            {i18n.t('dropdown.disconnectWallet')}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default MobileWallet
