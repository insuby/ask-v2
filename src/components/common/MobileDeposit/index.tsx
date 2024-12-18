import styles from './styles.module.scss'

import { useI18n } from '@i18n'
import { ArrowIcon, CardIcon, MarketIcon, WalletIconUserDropdown } from '@icons'

interface MobileDepositProps {
  page: string
}
const MobileDeposit = ({ page }: MobileDepositProps) => {
  const i18n = useI18n()
  return (
    <div className={page === 'Deposit' ? styles.container : styles.hidden}>
      <button className={styles.depositItem}>
        <div className={styles.depositText}>
          <CardIcon fill="#D9E2FF" />
          <p>
            {i18n.t('mobileDeposit.bankCard')}
            <span>{i18n.t('mobileDeposit.buyOnCard')}</span>
          </p>
        </div>
        <ArrowIcon
          style={{
            transform: 'rotate(90deg)',
            width: '30px',
            height: '30px',
            fill: '#8F9099',
          }}
        />
      </button>
      <button className={styles.depositItem}>
        <div className={styles.depositText}>
          <MarketIcon width={24} height={24} fill="#D9E2FF" />
          <p>
            {i18n.t('mobileDeposit.peopleToPeople')}
            <span>{i18n.t('mobileDeposit.buyFromSeller')}</span>
          </p>
        </div>
        <ArrowIcon
          style={{
            transform: 'rotate(90deg)',
            width: '30px',
            height: '30px',
            fill: '#8F9099',
          }}
        />
      </button>
      <button className={styles.depositItem}>
        <div className={styles.depositText}>
          <WalletIconUserDropdown width={24} height={24} fill="#D9E2FF" />
          <p>
            {i18n.t('mobileDeposit.anotherWallet')}
            <span>{i18n.t('mobileDeposit.transferFromAnotherWallet')}</span>
          </p>
        </div>
        <ArrowIcon
          style={{
            transform: 'rotate(90deg)',
            width: '30px',
            height: '30px',
            fill: '#8F9099',
          }}
        />
      </button>
    </div>
  )
}

export default MobileDeposit
