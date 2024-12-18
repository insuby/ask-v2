import { useWallet } from '@tronweb3/tronwallet-adapter-react-hooks'

import Status from '../Status'
import {
  isAccountsChangedEventData,
  useEndlessRepeater,
  useTronEventListenerEffect,
  useTronWebService,
} from '@hooks'
import { useCryptoStore } from '@store'
import { PageStatusesEnum } from '@types'
import { AppProps } from 'next/app'
import { useCallback, useEffect, useState } from 'react'

type ContentProps = AppProps
export default function Content({ Component, pageProps }: ContentProps) {
  const tronWebService = useTronWebService()
  const { addOrReplaceNotification, setProfile, resetProfile } =
    useCryptoStore()
  const [isOnline, setOnline] = useState(true)
  const { address, connected } = useWallet()

  const watchContractNotifications = useCallback(async () => {
    if (tronWebService && isOnline && connected) {
      // const notifications = await tronWebService.getLatestNotifications();
      // notifications.forEach(notification => {
      //   if (notification.recipient === address) {
      //     addOrReplaceNotification(notification);
      //   }
      // });
    }
  }, [tronWebService, isOnline, connected])

  useEffect(() => {
    void watchContractNotifications()
  }, [watchContractNotifications])

  useEndlessRepeater(3000, () => {
    void watchContractNotifications()
  })

  useTronEventListenerEffect(
    'accountsChanged',
    (event) => {
      if (isAccountsChangedEventData(event.data) && event.data.address) {
        setProfile({
          address: event.data.address,
          balanceUSDT: null,
          balanceTRX: null,
          network: null,
        })
      }
    },
    [],
  )

  useTronEventListenerEffect(
    'disconnectWeb',
    () => {
      resetProfile()
    },
    [],
  )

  useEffect(() => {
    setOnline(navigator.onLine)

    window.addEventListener('online', () => {
      setOnline(true)
    })

    window.addEventListener('offline', () => {
      setOnline(false)
      resetProfile()
    })
  }, [])

  if (!isOnline) return <Status status={PageStatusesEnum.noInternet} />

  return (
    <>
      {isOnline ? (
        <Component {...pageProps} />
      ) : (
        <Status status={PageStatusesEnum.noInternet} />
      )}
    </>
  )
}
