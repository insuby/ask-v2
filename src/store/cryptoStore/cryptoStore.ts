import { DealState } from '@tron'
import {
  DealInfoSlice,
  DealInfoState,
  DealListSlice,
  ICryptoStore,
  NotificationSlice,
  NotificationState,
  ProfileSlice,
  ProfileState,
} from '@types'
import { StateCreator, StoreApi, UseBoundStore, create } from 'zustand'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'
import { StoreMutatorIdentifier } from 'zustand/vanilla'

export enum LoadingState {
  IDLE = 'idle',
  PENDING = 'pending',
  SUCCEEDED = 'succeeded',
  FAILED = 'failed',
}

const initialStates = {
  profile: {
    address: null,
    balanceTRX: '0.0',
    balanceUSDT: '0.0',
    network: 'Mainnet',
  },
  dealInfoLoadingState: LoadingState.IDLE,
  dealInfo: null,
  dealInfoListLoadingState: LoadingState.IDLE,
  dealList: [],
  dealInfoTotalCount: 0,
  dealInfoLimit: 100,
  dealInfoOffset: 0,
  createDealInfoLoadingState: LoadingState.IDLE,
  notificationList: [],
}

const createProfileSlice: StateCreator<
  ProfileSlice,
  [],
  [StoreMutatorIdentifier, unknown][]
> = persist(
  (set) => ({
    profile: initialStates.profile,
    setProfile: async (address, tronWebService) => {
      if (!tronWebService) return

      const [balanceTRX, balanceUSDT] = await tronWebService.getBalance()

      set({
        profile: {
          address,
          balanceTRX: balanceTRX.toFixed(1),
          balanceUSDT: balanceUSDT.toFixed(1),
          network: 'Mainnet',
        },
      })
    },
    resetProfile: () =>
      set({
        profile: {
          address: null,
          balanceTRX: '0.0',
          balanceUSDT: '0.0',
          network: '',
        },
      }),
  }),
  {
    name: 'profile',
    storage: createJSONStorage<ProfileState>(() => sessionStorage),
  },
)

const createDealInfoSlice: StateCreator<DealInfoSlice> = (set) => ({
  dealInfo: initialStates.dealInfo,
  dealInfoLoadingState: initialStates.dealInfoLoadingState,
  fetchDealInfo: async ({ id }, tronWebService) => {
    try {
      set({ dealInfoLoadingState: LoadingState.PENDING })
      const dealInfo = await tronWebService.getDeal(id)
      set({
        dealInfoLoadingState: LoadingState.SUCCEEDED,
        dealInfo: {
          ...dealInfo,
          amount: dealInfo.amount,
          totalAmount: dealInfo.totalAmount,
          feeInfo: {
            garantFeeInDispute: dealInfo.feeInfo.garantFeeInDispute,
            garantFeeInNormal: dealInfo.feeInfo.garantFeeInNormal,
            serviceFee: dealInfo.feeInfo.serviceFee,
            agentsFee: dealInfo.feeInfo.agentsFee,
          },
        },
      })
    } catch (error) {
      set({ dealInfoLoadingState: LoadingState.FAILED })
    }
  },
  silentUpdateDealInfo: async ({ id }, tronWebService) => {
    try {
      const dealInfo = await tronWebService.getDeal(id)
      set((state) => {
        if (!state.dealInfo || dealInfo.state === state.dealInfo?.state) {
          return state
        }
        return { dealInfo }
      })
    } catch (error) {
      console.error(error)
    }
  },
  approveDealByBuyer: async ({ id }, tronWebService) => {
    try {
      set({ dealInfoLoadingState: LoadingState.PENDING })
      await tronWebService.approveByBuyer(id)
      set({ dealInfoLoadingState: LoadingState.SUCCEEDED })
    } catch (error) {
      set({ dealInfoLoadingState: LoadingState.FAILED })
    }
  },
  approveDealByTaker: async ({ id }, tronWebService) => {
    try {
      set({ dealInfoLoadingState: LoadingState.PENDING })
      await tronWebService.approveBySeller(id)
      set({ dealInfoLoadingState: LoadingState.SUCCEEDED })
    } catch (error) {
      set({ dealInfoLoadingState: LoadingState.FAILED })
    }
  },
  approveDealByArbiter: async ({ id }, tronWebService) => {
    try {
      set({ dealInfoLoadingState: LoadingState.PENDING })
      await tronWebService.approveByGarant(id)
      set({ dealInfoLoadingState: LoadingState.SUCCEEDED })
    } catch (error) {
      set({ dealInfoLoadingState: LoadingState.FAILED })
    }
  },
  cancelDeal: async ({ id }, tronWebService) => {
    try {
      set({ dealInfoLoadingState: LoadingState.PENDING })
      await tronWebService.cancel(id)
      set({ dealInfoLoadingState: LoadingState.SUCCEEDED })
    } catch (error) {
      set({ dealInfoLoadingState: LoadingState.FAILED })
    }
  },
  releaseDeal: async ({ id }, tronWebService) => {
    try {
      set({ dealInfoLoadingState: LoadingState.PENDING })
      await tronWebService.releaseDeal(id)
      set({ dealInfoLoadingState: LoadingState.SUCCEEDED })
    } catch (error) {
      set({ dealInfoLoadingState: LoadingState.FAILED })
    }
  },
  toDisputeDeal: async ({ id }, tronWebService) => {
    try {
      set({ dealInfoLoadingState: LoadingState.PENDING })
      await tronWebService.toDispute(id)
      set({ dealInfoLoadingState: LoadingState.SUCCEEDED })
    } catch (error) {
      set({ dealInfoLoadingState: LoadingState.FAILED })
    }
  },
  toReviewDeal: async ({ id }, tronWebService) => {
    try {
      set({ dealInfoLoadingState: LoadingState.PENDING })
      await tronWebService.toReview(id)
      set({ dealInfoLoadingState: LoadingState.SUCCEEDED })
    } catch (error) {
      set({ dealInfoLoadingState: LoadingState.FAILED })
    }
  },
  createDealInfoLoadingState: initialStates.createDealInfoLoadingState,
  createDealInfo: async (
    {
      isSellersRequest,
      makerAddress,
      takerAddress,
      arbiterAddress,
      amount,
      serviceFee,
      arbiterFeeInNormal,
      arbiterFeeInDispute,
      terms,
      agents,
      totalAmount,
    },
    tronWebService,
    fulfilledCallback,
    failedCallback,
  ) => {
    try {
      set({ createDealInfoLoadingState: LoadingState.PENDING })
      const nextDealId = Date.now()

      if (!isSellersRequest) {
        await tronWebService.approveTokens(totalAmount)
      }

      await tronWebService.createDeal(
        isSellersRequest,
        Date.now(),
        makerAddress,
        takerAddress,
        arbiterAddress,
        amount,
        arbiterFeeInNormal,
        arbiterFeeInDispute,
        terms,
        agents ?? [],
      )
      fulfilledCallback?.(nextDealId)
      set({ createDealInfoLoadingState: LoadingState.SUCCEEDED })
    } catch (error) {
      console.log(error)
      failedCallback?.()
      set({ createDealInfoLoadingState: LoadingState.FAILED })
    }
  },
  setDealInfo: (dealInfo: DealInfoState) => set({ dealInfo }),
  resetDealInfo: () => set({ dealInfo: null }),
})

const createDealListSlice: StateCreator<DealListSlice> = (set) => ({
  dealInfoList: initialStates.dealList,
  dealInfoListLoadingState: initialStates.dealInfoListLoadingState,
  dealInfoTotalCount: initialStates.dealInfoTotalCount,
  dealInfoLimit: initialStates.dealInfoLimit,
  dealInfoOffset: initialStates.dealInfoOffset,
  setDealInfoOffset: (offset: number) => {
    set({ dealInfoOffset: offset })
  },
  fetchDealInfoList: async (tronWebService) => {
    try {
      set({ dealInfoListLoadingState: LoadingState.PENDING })
      const [dealInfoList, dealInfoTotalCount] = await Promise.all([
        tronWebService.getDealList(),
        tronWebService.getDealsCount(),
      ])

      set(() => ({
        dealInfoListLoadingState: LoadingState.SUCCEEDED,
        dealInfoList,
        dealInfoTotalCount,
      }))
    } catch (error) {
      console.log(error)
      set({ dealInfoListLoadingState: LoadingState.FAILED })
    }
  },
  sortDealInfoList: (sortType: string) => {
    set((state) => {
      const sortedDealInfoList = [...state.dealInfoList]
      if (sortType === 'date') {
        sortedDealInfoList.sort((a, b) => b.createdAt - a.createdAt)
      } else {
        return { ...state }
      }
      return { ...state, dealInfoList: sortedDealInfoList }
    })
  },
  silentUpdateDealInfoList: async (tronWebService) => {
    try {
      const [dealInfoList, dealInfoTotalCount] = await Promise.all([
        tronWebService.getDealList(),
        tronWebService.getDealsCount(),
      ])
      set((state) => {
        const uniqueDealInfoList = Array.from(
          new Map(
            [...state.dealInfoList, ...dealInfoList].map((item) => [
              item.id,
              item,
            ]),
          ).values(),
        )
        return {
          dealInfoList: uniqueDealInfoList,
          dealInfoTotalCount,
        }
      })
    } catch (error) {
      console.error(error)
    }
  },
  setDealList: (dealList: DealInfoState[]) => set({ dealInfoList: dealList }),
})

const createNotificationSlice: StateCreator<NotificationSlice> = (set) => ({
  notificationList: initialStates.notificationList,
  addNotification: (notification: NotificationState) =>
    set((state) => ({
      notificationList: [...state.notificationList, notification],
    })),
  addOrReplaceNotification: (notification: NotificationState) =>
    set((state) => {
      const existAndRead = !!state.notificationList.find(
        (value) =>
          value.trxId === notification.trxId &&
          value.type === notification.type &&
          value.read,
      )

      if (existAndRead) return { notificationList: state.notificationList }

      return {
        notificationList: [
          ...state.notificationList.filter(
            (value) =>
              value.trxId !== notification.trxId &&
              value.type !== notification.type,
          ),
          notification,
        ],
      }
    }),
  readNotification: (trxId: string, type: DealState) =>
    set((state) => {
      return {
        notificationList: state.notificationList.map((notification) => {
          if (notification.trxId === trxId && notification.type === type) {
            notification.read = true
          }
          return notification
        }),
      }
    }),
})

export const useCryptoStore: UseBoundStore<StoreApi<ICryptoStore>> = create<
  ICryptoStore,
  [StoreMutatorIdentifier, unknown][]
>(
  devtools<ICryptoStore>((...rest) => ({
    ...createProfileSlice(...rest),
    ...createDealInfoSlice(...rest),
    ...createDealListSlice(...rest),
    ...createNotificationSlice(...rest),
  })),
)
