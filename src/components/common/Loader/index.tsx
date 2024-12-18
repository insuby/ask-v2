import styles from './styles.module.scss'

import { Loading } from '@icons'

const Loader = () => {
  return (
    <div className={styles.container}>
      <Loading />
    </div>
  )
}
export default Loader
