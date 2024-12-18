import { TronLinkAdapter } from '@tronweb3/tronwallet-adapter-tronlink'
import { WalletConnectAdapter } from '@tronweb3/tronwallet-adapter-walletconnect'

export const tronLinkAdapter = new TronLinkAdapter()

export const walletConnectAdapter = new WalletConnectAdapter({
  network: 'Mainnet',
  options: {
    relayUrl: 'wss://relay.walletconnect.com',
    projectId: '48b7ae0393332308c1be629127621481',
    metadata: {
      name: 'Ascro',
      description: 'Ascro',
      url: 'https://test.ascro.co',
      icons: ['https://test.ascro.co/favicon.ico'],
    },
  },
  web3ModalConfig: {
    themeMode: 'dark',
    themeVariables: {
      '--w3m-z-index': '1000',
    },
  },
})
