import { useWallet } from '@tronweb3/tronwallet-adapter-react-hooks'
import { TronLinkAdapterName } from '@tronweb3/tronwallet-adapter-tronlink'
import { WalletConnectWalletName } from '@tronweb3/tronwallet-adapter-walletconnect'

import styles from './styles.module.scss'
import { cx } from '@emotion/css'

import { Portal } from '@components'
import { useI18n } from '@i18n'
import { ErrorIcon, TronLink, TrustWalletIcon } from '@icons'
import { useUiStore } from '@store'
import { memo, useEffect } from 'react'

interface AuthModalProps {
  closeModalFn: VoidFunction
}

export const AuthModal = memo(({ closeModalFn }: AuthModalProps) => {
  const i18n = useI18n()
  const { errorMessage, setErrorMessage, clearErrorMessage } = useUiStore()
  const { connect, select, wallet, connecting } = useWallet()

  useEffect(() => {
    return () => {
      clearErrorMessage()
    }
  }, [])

  useEffect(() => {
    connecting && closeModalFn()
  }, [connecting])

  useEffect(() => {
    ;(async () => {
      if (wallet) await connect()
    })()
  }, [wallet?.adapter.name])

  return (
    <>
      <Portal overlayClickFn={closeModalFn}>
        <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
          <div className={styles.modalHeader}>
            <p className={styles.title}>
              {i18n.t('common.connectWalletTitle')}
            </p>
          </div>
          {errorMessage && (
            <div className={styles.errorBlock}>
              <ErrorIcon />
              <span>{errorMessage}</span>
            </div>
          )}
          <div
            className={cx(
              styles.linkIcon,
              connecting && styles.linkIcon_disabled,
            )}
            onClick={async () => {
              if (!window.tronLink) {
                setErrorMessage(i18n.t('common.extensionError'))
                return
              }
              select(TronLinkAdapterName)
            }}
          >
            <TronLink />
            <span>TronLink</span>
          </div>
          <div
            className={cx(
              styles.linkIcon,
              connecting && styles.linkIcon_disabled,
            )}
            onClick={() => {
              select(WalletConnectWalletName)
            }}
          >
            <TrustWalletIcon />
            <span>Wallet Connect</span>
          </div>
          <div className={styles.closeModal}>
            <button type="button" onClick={closeModalFn}>
              {i18n.t('common.cancelAuth')}
            </button>
          </div>
        </div>
      </Portal>
    </>
  )
})

export default AuthModal
