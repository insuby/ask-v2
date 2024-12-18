import { TronWeb } from 'tronweb'

declare global {
  interface Window {
    tronWeb: TronWeb
    TronWeb: TronWeb
  }
}
