import { create } from 'zustand'

interface CryptoCurrencyState {
  cryptoCurrency: {
    [key: string]: string | number
  }
  setCryptoCurrency: (name: string, value: string | number) => void
}

export const useCoin = create<CryptoCurrencyState>((set) => ({
  cryptoCurrency: {
    coin: 'USDT',
  },
  setCryptoCurrency: (name: string, value: string | number) =>
    set((state) => ({
      cryptoCurrency: { ...state.cryptoCurrency, coin: value },
    })),
}))
