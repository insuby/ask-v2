import styles from './styles.module.scss'

import { useCoin, useCryptoStore } from '@store'
import { DealState } from '@tron'
import { useEffect } from 'react'

const Statistics = () => {
  const {
    profile: { balanceTRX, balanceUSDT },
  } = useCryptoStore()
  const { dealInfoList } = useCryptoStore((state) => state)
  const { setCryptoCurrency } = useCoin()

  useEffect(() => {
    balanceUSDT && setCryptoCurrency(balanceUSDT, 'USDT')
  }, [balanceUSDT])

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
    <div className={styles.container}>
      <div className={styles.deals}>
        <h2 className={styles.title}>Deals stat</h2>
        <div className={styles.dealsItems}>
          <p className={styles.dealsItem}>
            Active deals <span>{activeDeals}</span>
          </p>
          <p className={styles.dealsItem}>
            In Dispute <span>{inDisputeDeals}</span>
          </p>
          <p className={styles.dealsItem}>
            Resolved <span>{resolvedDeals}</span>
          </p>
          <p className={styles.dealsItem}>
            Deals total <span>{totalDeals}</span>
          </p>
        </div>
      </div>
      <div className={styles.wallet}>
        <h2 className={styles.title}>Wallet stat</h2>
        <div className={styles.walletItems}>
          <p className={styles.dealsItem}>
            TRX
            <span>{balanceTRX ? balanceTRX : 0}</span>
          </p>
          <p className={styles.dealsItem}>
            USDT
            <span>{balanceUSDT ? balanceUSDT : 0}</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Statistics
