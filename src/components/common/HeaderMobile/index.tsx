import styles from './styles.module.scss'

import { MobileSwitchCoinsModal, MobileSwitchCurrency } from '@components'
import { LogoIcon, MenuIcon, NotificationIcon, TetherIcon } from '@icons'
import { useCryptoStore } from '@store'
import Link from 'next/link'
import { useState } from 'react'

interface HeaderMobileProps {
  setMenu: (m: boolean) => void
  setNotification: () => void
}
const HeaderMobile = ({ setMenu, setNotification }: HeaderMobileProps) => {
  const isWalletConnected = useCryptoStore((state) => !!state.profile?.address)
  const [activeModal, setActiveModal] = useState<string | null>(null)

  const handleSwitchCoinsMenu = () => {
    // setActiveModal('coins')
  }

  const handleSwitchCurrencyMenu = () => {
    // setActiveModal('currency')
  }
  return (
    <div className={styles.header}>
      <Link href={'/'}>
        <LogoIcon />
      </Link>
      {isWalletConnected ? (
        <div className={styles.buttons}>
          <button
            className={styles.button}
            onClick={() => handleSwitchCoinsMenu()}
          >
            <TetherIcon
              style={{
                width: '24px',
                height: '24px',
              }}
            />
            {/*<EtheriumIcon*/}
            {/*  className={styles.icon}*/}
            {/*  style={{*/}
            {/*    width: '24px',*/}
            {/*    height: '24px',*/}
            {/*  }}*/}
            {/*/>*/}
            {/*<ArrowIcon*/}
            {/*  style={{*/}
            {/*    marginLeft: '10px',*/}
            {/*    transform: 'rotate(180deg)',*/}
            {/*    width: '30px',*/}
            {/*    height: '30px',*/}
            {/*    fill: '#AFC6FF',*/}
            {/*  }}*/}
            {/*/>*/}
          </button>
          {activeModal === 'coins' && (
            <MobileSwitchCoinsModal
              setActiveModal={setActiveModal}
              handleSwitchCurrencyMenu={handleSwitchCurrencyMenu}
            />
          )}

          {activeModal === 'currency' && (
            <MobileSwitchCurrency setActiveModal={setActiveModal} />
          )}

          {/* <Notification /> */}
          <button
            onClick={() => setNotification()}
            className={styles.notificationButton}
          >
            <NotificationIcon height={'19px'} width={'19px'} />
          </button>
          <button
            onClick={() => setMenu(true)}
            className={styles.button + ' ' + styles.buttonRounded}
          >
            <MenuIcon />
          </button>
        </div>
      ) : (
        <p></p>
      )}
    </div>
  )
}

export default HeaderMobile
