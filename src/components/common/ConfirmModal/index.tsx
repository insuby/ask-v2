import styles from './styles.module.scss'

import { Button, Portal } from '@components'
import { useI18n } from '@i18n'
import { ButtonTypes } from '@types'

interface ConfirmModalProps {
  isOpen: boolean
  closeModalFn: () => void
  confirmModalFn: () => void
  confirmText: string
}

const ConfirmModal = ({
  isOpen,
  confirmModalFn,
  closeModalFn,
  confirmText,
}: ConfirmModalProps) => {
  const i18n = useI18n()
  return isOpen ? (
    <Portal overlayClickFn={closeModalFn}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <p className={styles.title}>{confirmText}</p>
        <div className={styles.buttonsBlock}>
          <Button buttonColor={ButtonTypes.darkCyan} onClick={confirmModalFn}>
            {i18n.t('modal.confirmButton')}
          </Button>
          <Button buttonColor={ButtonTypes.darkCyan} onClick={closeModalFn}>
            {i18n.t('modal.closeButton')}
          </Button>
        </div>
      </div>
    </Portal>
  ) : null
}
export default ConfirmModal
