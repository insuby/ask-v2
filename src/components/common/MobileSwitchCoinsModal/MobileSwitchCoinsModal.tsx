import styles from './styles.module.scss'

import { useClickOutside } from '@hooks'
import {
  ArbitrumIcon,
  ArrowIcon,
  BaseIcon,
  EtheriumIcon,
  PolygonIcon,
} from '@icons'
import { FC, useRef } from 'react'

interface IMobileHeaderDropdownCurrency {
  setActiveModal: (dropdown: string | null) => void
  handleSwitchCurrencyMenu: () => void
}
const MobileSwitchCoinsModal: FC<IMobileHeaderDropdownCurrency> = ({
  setActiveModal,
  handleSwitchCurrencyMenu,
}) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  useClickOutside(wrapperRef, () => setActiveModal(''))

  return (
    <>
      <div
        ref={wrapperRef}
        className={styles.modal}
        onClick={handleSwitchCurrencyMenu}
      >
        <div className={styles['modal__name']}>
          <div className={styles['modal__etherium']}>
            <EtheriumIcon />
            <div className={styles.coinsBetween}>
              <span>Etherium</span>
              <ArrowIcon
                style={{ transform: 'rotate(90deg)' }}
                fill={'#8F9099'}
              />
            </div>
          </div>
          <div className={styles['modal__arbitrum']}>
            <ArbitrumIcon />
            <div className={styles.coinsBetween}>
              <span>Arbitrum</span>
              <ArrowIcon
                style={{ transform: 'rotate(90deg)' }}
                fill={'#8F9099'}
              />
            </div>
          </div>
          <div className={styles['modal__base']}>
            <BaseIcon />
            <div className={styles.coinsBetween}>
              <span>Base</span>
              <ArrowIcon
                style={{ transform: 'rotate(90deg)' }}
                fill={'#8F9099'}
              />
            </div>
          </div>
          <div className={styles['modal__polygon']}>
            <PolygonIcon />
            <div className={styles.coinsBetween}>
              <span>Polygon</span>
              <ArrowIcon
                style={{ transform: 'rotate(90deg)' }}
                fill={'#8F9099'}
              />
            </div>
          </div>
        </div>
        {/* <div className={styles.divider}></div>
    <div className={styles.coins}>
      <div className={styles['coins__USDT']}>
        <USDIcon />
        <button type="button">USDT</button>
      </div>
      <div className={styles['coins__ETH']}>
        <ColorfulEtheriumIcon />
        <button type="button">ETH</button>
      </div>
    </div> */}
      </div>
    </>
  )
}

export default MobileSwitchCoinsModal
