import styles from './styles.module.scss'

import { longestStringFormatter } from '@common'
import { useI18n } from '@i18n'
import { useRouter } from 'next/router'
import type { FC } from 'react'

interface RowProps {
  ratingDealInfo: {
    id: number
    walletNumber: string
    all: number
    successful: number
    garants: number
  }
  style: string | undefined
}

const RatingRow: FC<RowProps> = ({ ratingDealInfo, style }) => {
  const router = useRouter()
  const i18n = useI18n()
  const onClickHandler = (id: number) => {
    router.push(`/${id}/information`)
  }

  return (
    <tr
      className={styles.row}
      onClick={() => onClickHandler(ratingDealInfo.id)}
      style={{ background: style }}
    >
      <td>{ratingDealInfo.id}</td>
      <td>{longestStringFormatter(ratingDealInfo.walletNumber)}</td>
      <td>{ratingDealInfo.all}</td>
      <td className={styles.left}>{ratingDealInfo.successful}</td>
      <td>{ratingDealInfo.garants}</td>
    </tr>
  )
}

export default RatingRow
