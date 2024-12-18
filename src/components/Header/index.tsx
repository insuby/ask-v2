import styles from './styles.module.scss'

import {
  AuthModal,
  Button,
  ChooseRole,
  DealsButton,
  DropdownUserInformation,
  HeaderDropdownCurrency,
  SwitchCoinsModal,
} from '@components'
import { useI18n } from '@i18n'
import {
  LogoIcon,
  NotificationIcon,
  ResponsiveWalletIcon,
  StarRating,
  Suitcase,
  TransparentRatingStarIcon,
  TransparentSuitCaseIcon,
} from '@icons'
import { useCryptoStore, useUiStore } from '@store'
import { ButtonTypes } from '@types'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC, useCallback, useState } from 'react'

const Header: FC = () => {
  const i18n = useI18n()
  const [dropdown, setDropdown] = useState<boolean>(false)
  const [modalChooseRole, setModalChooseRole] = useState<boolean>(false)
  const isWalletConnected = useCryptoStore((state) => !!state.profile.address)
  const { isAuthModalOpen, openAuthModal, closeAuthModal } = useUiStore(
    (state) => state,
  )
  const router = useRouter()
  const isRatingPage = router.pathname === '/rating'
  const toggleModal = useCallback(
    () => (isAuthModalOpen ? closeAuthModal() : openAuthModal()),
    [isAuthModalOpen],
  )

  const handleToggleDropdown = () => {
    setDropdown(!dropdown)
  }

  const dealsButton = [
    {
      id: 1,
      title: i18n.t('common.deals'),
      href: '/',
      icon: isRatingPage ? <TransparentSuitCaseIcon /> : <Suitcase />,
    },
    {
      id: 2,
      title: i18n.t('common.rating'),
      href: '/rating',
      icon: isRatingPage ? <TransparentRatingStarIcon /> : <StarRating />,
    },
  ]
  return (
    <>
      <header className={isRatingPage ? styles.headerRating : styles.header}>
        <div className={styles.leftSide}>
          <Link href={'/'}>
            <LogoIcon />
            <h1>Ascro</h1>
          </Link>
          <div className={styles.pages}>
            {dealsButton.map((item, idx) => {
              return (
                <div key={idx} className={styles.deals}>
                  <DealsButton href={item.href}>
                    {item.icon}
                    {item.title}
                  </DealsButton>
                </div>
              )
            })}
          </div>
        </div>
        <div className={styles.rightSide}>
          {isWalletConnected ? (
            <div className={styles.userInfo}>
              <div className={styles.switchAndCurrency}>
                <HeaderDropdownCurrency
                  dropdown={dropdown}
                  setDropdown={setDropdown}
                />
                {dropdown ? <SwitchCoinsModal /> : <></>}
                {/* Уведомление, кнопка с background и колокольчиком */}
                {/* <Notification /> */}
              </div>

              <DropdownUserInformation />
            </div>
          ) : (
            <>
              <div onClick={handleToggleDropdown}>
                <HeaderDropdownCurrency
                  dropdown={dropdown}
                  setDropdown={setDropdown}
                />
              </div>
              <div className={styles.connectWallet}>
                <Button buttonColor={ButtonTypes.lilac} onClick={toggleModal}>
                  <span>{i18n.t('common.connectWallet')}</span>
                </Button>
              </div>
              <div className={styles.responsiveRightSide}>
                <div className={styles.responsiveNotification}>
                  <NotificationIcon width={'22px'} height={'28px'} />
                </div>
                <div
                  className={styles.connectWalletResponsive}
                  onClick={toggleModal}
                >
                  <ResponsiveWalletIcon />
                </div>
              </div>
            </>
          )}
        </div>
      </header>
      {isAuthModalOpen && <AuthModal closeModalFn={toggleModal} />}
      {modalChooseRole && (
        <ChooseRole
          modalChooseRole={modalChooseRole}
          setModalChooseRole={setModalChooseRole}
        />
      )}
    </>
  )
}

export default Header
