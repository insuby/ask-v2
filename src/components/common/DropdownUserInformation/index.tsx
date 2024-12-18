import { useWallet } from '@tronweb3/tronwallet-adapter-react-hooks'

import styles from './styles.module.scss'

import { longestStringFormatter, shortenStringFormatter } from '@common'
import { Button, CopyButton } from '@components'
import { useClickOutside } from '@hooks'
import { useI18n } from '@i18n'
import { ArrowIcon, TrashIcon, WalletIconUserDropdown } from '@icons'
import { useCryptoStore } from '@store'
import { ButtonTypes } from '@types'
import classNames from 'classnames'
import { FC, useRef, useState } from 'react'

const DropdownUserInformation: FC = () => {
  const i18n = useI18n()
  const [showInfo, setShowInfo] = useState<boolean>(false)
  const { disconnect } = useWallet()
  const {
    profile: { address, network, balanceTRX, balanceUSDT },
    resetProfile,
  } = useCryptoStore()

  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const buttonRef = useRef<HTMLDivElement | null>(null)

  useClickOutside(wrapperRef, () => setShowInfo(false))

  const toggleList = () => {
    setShowInfo((prev) => !prev)
  }

  const disconnectWalletHandler = () => {
    resetProfile()
    disconnect()
  }

  return (
    <div ref={wrapperRef} className={styles.profileInfo}>
      <div
        ref={buttonRef}
        className={classNames(styles.profileButton, {
          [styles.active]: showInfo,
        })}
        onClick={toggleList}
      >
        <div
          className={classNames(styles.profileHeader, {
            [styles.active]: showInfo,
          })}
        >
          <WalletIconUserDropdown width={30} height={30} fill="#002D6D" />
          <span>{shortenStringFormatter(address || '')}</span>
          {showInfo ? (
            <ArrowIcon
              style={{ transform: 'rotate(180deg)' }}
              fill={showInfo ? '#002D6D' : '#8F9099'}
            />
          ) : (
            <ArrowIcon />
          )}
        </div>
      </div>
      {showInfo && (
        <div className={styles.profileInformationBlock}>
          <div className={styles.profileInfoRow}>
            <h4 className={styles.title}>{i18n.t('dropdown.wallet')}</h4>
            <div className={styles.addressBlock}>
              <span>{longestStringFormatter(address ?? '')}</span>
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
            <h4 className={styles.title}>{i18n.t('dropdown.balanceUSDT')}</h4>
            <div className={styles.balance}>
              <span className={styles.countBalance}>
                {balanceUSDT ? balanceUSDT : 0}
              </span>
              <span className={styles.currency}>USDT</span>
            </div>
            <div className={styles.freezeActive}></div>
            <h4 className={styles.title}>{i18n.t('dropdown.balanceTRX')}</h4>
            <div className={styles.freeze}>
              <span className={styles.countBalance}>
                {balanceTRX ? balanceTRX : 0}
              </span>
              <span className={styles.currency}>TRX</span>
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
      )}
    </div>
  )
}

export default DropdownUserInformation
