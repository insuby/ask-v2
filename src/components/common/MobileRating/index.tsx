import styles from './styles.module.scss'

import { useState } from 'react'

interface MobileRatingProps {
  page: string
}
const MobileRating = ({ page }: MobileRatingProps) => {
  const [arbCheck, setArbCheck] = useState(false)
  const [buyCheck, setBuyCheck] = useState(false)
  const [sellCheck, setSellCheck] = useState(false)

  const handleCheck = (value: string) => {
    if (value == 'arb' && !arbCheck) {
      setArbCheck(true)
      setBuyCheck(false)
      setSellCheck(false)
    } else {
      setArbCheck(false)
    }
    if (value == 'buy' && !buyCheck) {
      setBuyCheck(true)
      setArbCheck(false)
      setSellCheck(false)
    } else {
      setBuyCheck(false)
    }
    if (value == 'sell' && !sellCheck) {
      setSellCheck(true)
      setBuyCheck(false)
      setArbCheck(false)
    } else {
      setSellCheck(false)
    }
  }

  return (
    <div className={page === 'Rating' ? styles.container : styles.hidden}>
      <label
        className={
          arbCheck
            ? styles.ratingSelect + ' ' + styles.ratingSelectActive
            : styles.ratingSelect
        }
      >
        Guarantors{' '}
        <input
          type="checkbox"
          checked={arbCheck}
          onClick={() => handleCheck('arb')}
        />
      </label>
      <label
        className={
          buyCheck
            ? styles.ratingSelect + ' ' + styles.ratingSelectActive
            : styles.ratingSelect
        }
      >
        Buyers{' '}
        <input
          type="checkbox"
          checked={buyCheck}
          onClick={() => handleCheck('buy')}
        />
      </label>
      <label
        className={
          sellCheck
            ? styles.ratingSelect + ' ' + styles.ratingSelectActive
            : styles.ratingSelect
        }
      >
        Sellers{' '}
        <input
          type="checkbox"
          checked={sellCheck}
          onClick={() => handleCheck('sell')}
        />
      </label>
    </div>
  )
}

export default MobileRating
