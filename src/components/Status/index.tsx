import styles from './styles.module.scss'

import { PageStatus } from '@components'
import { PageStatusesEnum } from '@types'
import { useRouter } from 'next/router'

type StatusProps = {
  status: PageStatusesEnum
}

export default function Status({ status }: StatusProps) {
  const router = useRouter()
  return (
    <div className={styles.container}>
      <PageStatus status={status} />
      {status !== 'CONNECT_WALLET' && (
        <button onClick={() => router.back()}>Go back</button>
      )}
    </div>
  )
}
