import styles from './styles.module.scss'

import {
  MobileDeposit,
  MobileNotifications,
  MobileStat,
  MobileWallet,
} from '@components'
import { useI18n } from '@i18n'
import {
  ArrowIcon,
  StarOutline,
  TransparentSuitCaseIcon,
  VectorInputIcons,
  WalletIconUserDropdown,
} from '@icons'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface MobileMenuProps {
  menu: boolean
  setMenu: (m: boolean) => void
  basePage?: string
  setNotification: (m: string) => void
}
const style = {
  transform: 'rotate(90deg)',
  width: 30,
  height: 30,
}
const vInputIconsStyle = { marginRight: '6px', width: '24px', height: '24px' }
const MobileMenu = ({
  menu,
  setMenu,
  basePage,
  setNotification,
}: MobileMenuProps) => {
  const [page, setPage] = useState('')
  const handleExit = () => {
    setMenu(false)
    setPage('')
    setNotification('')
  }
  useEffect(() => {
    if (basePage) {
      setPage(basePage)
    }
  }, [menu])
  const i18n = useI18n()
  return (
    <div className={menu ? styles.container : styles.hidden}>
      <div className={styles.header}>
        <h2>{page || 'Menu'}</h2>
        <button className={styles.exit} onClick={handleExit}>
          &#10006;
        </button>
      </div>
      <div className={styles.wrapper}>
        <MobileWallet exitModal={setMenu} page={page} setPage={setPage} />
        <MobileStat page={page} />
        <MobileDeposit page={page} />
        <MobileNotifications setMenu={setMenu} page={page} />
        <div>
          <p className={styles.title}>Account</p>
          <div className={styles.buttonWrapper}>
            <button
              onClick={() => {
                setPage('Wallet')
              }}
            >
              <span>
                <WalletIconUserDropdown
                  fill="#D9E2FF"
                  width={24}
                  height={24}
                  style={{ marginRight: '6px' }}
                />
                {i18n.t('mobileMenu.wallet')}
              </span>
              <ArrowIcon style={style} fill="#D9E2FF" />
            </button>
            <button
              onClick={() => {
                setPage('Statistics')
              }}
            >
              <span>
                <VectorInputIcons fill="#D9E2FF" style={vInputIconsStyle} />{' '}
                {i18n.t('mobileMenu.stats')}
              </span>
              <ArrowIcon style={style} fill="#D9E2FF" />
            </button>
          </div>
        </div>
        <div>
          <p className={styles.title + ' ' + styles.secondTitle}>Sections</p>
          <div className={styles.buttonWrapper}>
            <button onClick={handleExit}>
              <Link href="/" className={styles.link}>
                <span>
                  <TransparentSuitCaseIcon
                    fill="#D9E2FF"
                    style={vInputIconsStyle}
                  />{' '}
                  {i18n.t('mobileMenu.deals')}
                </span>
                <ArrowIcon style={style} fill="#D9E2FF" />
              </Link>
            </button>
            <button
              onClick={() => {
                handleExit()
              }}
            >
              <Link href="/rating" className={styles.link}>
                <span>
                  <span className={styles.star}>
                    <StarOutline fill="#D9E2FF" />
                  </span>
                  {i18n.t('mobileMenu.rating')}
                </span>
                <ArrowIcon style={style} fill="#D9E2FF" />
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MobileMenu
