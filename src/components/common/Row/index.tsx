import styles from './styles.module.scss'

import {
  amountFormatter,
  dateFromEpochFormatter,
  dealRoleFormatter,
} from '@common'
import { DealStateInfo } from '@components'
import { useI18n } from '@i18n'
import { DealInfo } from '@tron'
import { useRouter } from 'next/router'
import { FC } from 'react'

interface RowProps {
  dealInfo: DealInfo
}

const Row: FC<RowProps> = ({ dealInfo }) => {
  const router = useRouter()
  const i18n = useI18n()
  const onClickHandler = (id: number) => {
    router.push(`/${id}/information`)
  }

  const dealRoleKey =
    dealInfo.role !== undefined ? dealRoleFormatter(dealInfo.role) : undefined

  const dealRole = dealRoleKey ? i18n.t(dealRoleKey) : undefined
  return (
    <>
      <tr className={styles.row} onClick={() => onClickHandler(dealInfo.id)}>
        <td>{dateFromEpochFormatter(dealInfo.createdAt)}</td>
        <td>{dealInfo.id}</td>
        <td>{dealRole ?? '-'}</td>
        <td>{amountFormatter(dealInfo.amount)}</td>
        <td className={styles.statusColumn}>
          <DealStateInfo value={dealInfo.state} />
        </td>
      </tr>
    </>
  )
}

export default Row
