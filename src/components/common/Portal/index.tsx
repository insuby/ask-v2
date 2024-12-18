import styles from './styles.module.scss'

import { ReactNode } from 'react'
import { createPortal } from 'react-dom'

interface PortalProps {
  children: ReactNode
  overlayClickFn: () => void
}

const Portal = ({ children, overlayClickFn }: PortalProps) => {
  const portal = document.querySelector('#portal')
  return portal
    ? createPortal(
        <div className={styles.overlay} onClick={overlayClickFn}>
          {children}
        </div>,
        portal,
      )
    : null
}
export default Portal
