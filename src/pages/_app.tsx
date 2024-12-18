import type { Adapter } from '@tronweb3/tronwallet-abstract-adapter'
import {
  WalletProvider,
  useWallet,
} from '@tronweb3/tronwallet-adapter-react-hooks'

import styles from '../styles/app.module.scss'
import '../styles/globals.scss'
import '../styles/style.css'

import { tronLinkAdapter, walletConnectAdapter } from '../adapters'
import TronWebService from '../tron/tronWebService'
import { Content, Header, HeaderMobile, Loader, MobileMenu } from '@components'
import { config } from '@config'
import { useHasMounted, useTronWebService } from '@hooks'
import { useCryptoStore } from '@store'
import {
  TronWebServiceContext,
  TronWebServiceContextState,
  TronWebServiceProvider,
} from '@tron'
import { ProfileSlice } from '@types'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useContext, useEffect, useState } from 'react'

const createTronWebService = ({
  adapter,
  address,
  setProfile,
  setService,
}: {
  adapter: NonNullable<Adapter>
  address: string
  setProfile: ProfileSlice['setProfile']
  setService: TronWebServiceContextState['setService']
}) => {
  const tronWebService = new TronWebService(
    adapter as Adapter & { address: string },
    config.tronContractAddress,
    config.tronTokenAddress,
  )
  if (!!tronWebService) {
    setService?.(tronWebService)
    setProfile(address, tronWebService)
  }

  return tronWebService
}

export default function App(props: AppProps) {
  return (
    <>
      <Head>
        <title>Ascro</title>
        <meta name="description" content="Ascro" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
        <div className={styles.content}>
          <TronWebServiceProvider >
            <Wallet {...props}  />
          </TronWebServiceProvider>
        </div>
      </div>
    </>
  )
}

const Wallet = (props: AppProps) => {
  const [adapter, setAdapter] = useState<Adapter>()
  const { setProfile, fetchDealInfoList } = useCryptoStore()
  const { setService } = useContext(TronWebServiceContext)

  return (
    <WalletProvider
      adapters={[walletConnectAdapter, tronLinkAdapter]}
      onAdapterChanged={(adapter) => adapter && setAdapter(adapter)}
      onConnect={(address) => {
        if (!adapter || !adapter.address) return
        const tronWebService = createTronWebService({
          adapter,
          address,
          setProfile,
          setService,
        })
        fetchDealInfoList(tronWebService)
      }}
      onAccountsChanged={(address) => {
        const tronWebService =
          adapter &&
          createTronWebService({ adapter, address, setProfile, setService })
        tronWebService && fetchDealInfoList(tronWebService)
      }}
      onDisconnect={console.log}
      onError={console.log}
    >
      <Pages {...props} />
    </WalletProvider>
  )
}

const Pages = (props: AppProps) => {
  const hasMounted = useHasMounted()
  const [mobileMenu, setMobileMenu] = useState(false)
  const [notifiactionPage, setNotificationPage] = useState('')

  const tronWebService = useTronWebService()
  const { setProfile, fetchDealInfoList } = useCryptoStore()
  const { setService } = useContext(TronWebServiceContext)
  const { wallet, address } = useWallet()

  useEffect(() => {
    if (!!tronWebService) return

    if (wallet && wallet.adapter && address) {
      const tronWebService = createTronWebService({
        adapter: wallet.adapter,
        address,
        setProfile,
        setService,
      })
      fetchDealInfoList(tronWebService)
    }
  }, [wallet, tronWebService, address])

  const setMenu = () => {
    setMobileMenu(true)
    setNotificationPage('Notifications')
  }

  if (!hasMounted) return <Loader />

  return (
    <>
      <Header />
      <HeaderMobile setMenu={setMobileMenu} setNotification={setMenu} />
      <MobileMenu
        menu={mobileMenu}
        basePage={notifiactionPage}
        setMenu={setMobileMenu}
        setNotification={setNotificationPage}
      />
      <Content {...props} />
    </>
  )
}
