import styles from './styles.module.scss'

import { Status } from '@components'
import { PageStatusesEnum } from '@types'

export default function Custom404() {
  return (
    <>
      <div className={styles.container}>
        <Status status={PageStatusesEnum.notFound} />
      </div>
    </>
  )
}
