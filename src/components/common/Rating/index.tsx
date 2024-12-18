import styles from './styles.module.scss'

import Link, { LinkProps } from 'next/link'
import { PropsWithChildren } from 'react'

const Rating = ({ children, href }: LinkProps & PropsWithChildren) => {
  return (
    <Link className={styles.rating} href={href}>
      {children}
    </Link>
  )
}

export default Rating
