import styles from './styles.module.scss'

import { Loading } from '@icons'

const LoaderSmall = () => {
  return (
    <div className={styles.container}>
      <Loading />
    </div>
  )
}

export default LoaderSmall
