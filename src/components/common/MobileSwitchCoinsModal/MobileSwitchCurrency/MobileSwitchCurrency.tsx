import styles from './styles.module.scss'

import { useClickOutside } from '@hooks'
import { ColorfulEtheriumIcon, USDIcon } from '@icons'
import { FC, useRef } from 'react'

interface IMobileSwitchCurrency {
  setActiveModal: (dropdown: string | null) => void
}

const MobileSwitchCurrency: FC<IMobileSwitchCurrency> = ({
  setActiveModal,
}) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  useClickOutside(wrapperRef, () => setActiveModal(''))
  return (
    <div className={styles.currency} ref={wrapperRef}>
      <div className={styles['currency__modal']}>
        <div className={styles['currency__usdt']}>
          <div>
            <USDIcon />
          </div>
          <span>USDT</span>
        </div>
        <div className={styles['currency__eth']}>
          <div>
            <ColorfulEtheriumIcon />
          </div>
          <span>ETH</span>
        </div>
      </div>
    </div>
  )
}

export default MobileSwitchCurrency
