import styles from './styles.module.scss'

import { useCoin, useCryptoStore } from '@store'
import { DealState } from '@tron'

interface MobileStatProps {
  page: string
}
const MobileStat = ({ page }: MobileStatProps) => {
  const {
    profile: { balanceTRX, balanceUSDT },
  } = useCryptoStore()
  const { dealInfoList } = useCryptoStore((state) => state)
  const { cryptoCurrency, setCryptoCurrency } = useCoin()

  const activeDeals = dealInfoList.filter(
    (deal) => deal.state === DealState.InProgress,
  ).length
  const inDisputeDeals = dealInfoList.filter(
    (deal) => deal.state === DealState.InDispute,
  ).length
  const resolvedDeals = dealInfoList.filter(
    (deal) => deal.state === DealState.Resolved,
  ).length
  const totalDeals = dealInfoList.length

  return (
    <div className={page === 'Statistics' ? styles.container : styles.hidden}>
      <p>Deals stat</p>
      <div>
        <p className={styles.statItem} style={{ marginTop: '16px' }}>
          Active deals: <span>{activeDeals}</span>
        </p>
        <p className={styles.statItem} style={{ marginTop: '16px' }}>
          In Dispute: <span>{inDisputeDeals}</span>
        </p>
        <p className={styles.statItem} style={{ marginTop: '16px' }}>
          Resolved: <span>{resolvedDeals}</span>
        </p>
        <p
          className={styles.statItem + ' ' + styles.statItemNoBorder}
          style={{ marginTop: '16px' }}
        >
          Deals total: <span>{totalDeals}</span>
        </p>
      </div>
      <div className={styles.walletStat}>
        <p>Wallet stat</p>
        <p
          className={styles.statItem + ' ' + styles.walletItem}
          style={{ marginTop: '16px' }}
        >
          Total:
          <span>
            0 <span>{cryptoCurrency.coin}</span>
          </span>
        </p>
        <p
          className={styles.statItem + ' ' + styles.walletItem}
          style={{ marginTop: '16px' }}
        >
          Freezed:
          {/* <span>
            9 <span>USDC</span>
          </span> */}
        </p>
        <p
          className={
            styles.statItem +
            ' ' +
            styles.statItemNoBorder +
            ' ' +
            styles.walletItem
          }
          style={{ marginTop: '16px' }}
        >
          Total cost:
          <span>
            0 <span>{cryptoCurrency.coin}</span>
          </span>
        </p>
      </div>
    </div>
  )
}

export default MobileStat
