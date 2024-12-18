import styles from './styles.module.scss'

import { useCryptoStore } from '@store'
import Link, { LinkProps } from 'next/link'
import { usePathname } from 'next/navigation'
import { PropsWithChildren } from 'react'

const DealsButton = ({ children, href }: LinkProps & PropsWithChildren) => {
  const pathname = usePathname()
  const isActive = pathname === String(href)
  const isWalletConnected = useCryptoStore((state) => !!state.profile.address)

  return (
    <Link
      className={isActive ? styles.activeDealsButton : styles.dealsButton}
      href={isWalletConnected ? href : ''}
    >
      {children}
    </Link>
  )
}

export default DealsButton
