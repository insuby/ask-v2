import styles from './styles.module.scss'

import Link, { LinkProps } from 'next/link'
import { PropsWithChildren } from 'react'

const ButtonLink = ({ children, href }: LinkProps & PropsWithChildren) => (
  <Link className={styles.buttonLink} href={href}>
    {children}
  </Link>
)

export default ButtonLink
