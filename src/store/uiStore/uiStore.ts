import { IUiStore, ModalAction } from '@types'
import { StoreApi, UseBoundStore, create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { StoreMutatorIdentifier } from 'zustand/vanilla'

const initialStates = {
  isAuthModalOpen: false,
  isConfirmModalOpen: false,
  confirmModalAction: ModalAction.VOID,
}

export const useUiStore: UseBoundStore<StoreApi<IUiStore>> = create<
  IUiStore,
  [StoreMutatorIdentifier, unknown][]
>(
  devtools<IUiStore>((set) => ({
    isAuthModalOpen: initialStates.isAuthModalOpen,
    openAuthModal: () => set({ isAuthModalOpen: true }),
    closeAuthModal: () => set({ isAuthModalOpen: false }),
    isConfirmModalOpen: initialStates.isConfirmModalOpen,
    confirmModalAction: initialStates.confirmModalAction,
    triggerConfirmModal: (message, action) => {
      if (typeof set !== 'function') {
        console.error('set is not a function')
        return
      }
      if (!message || !action) {
        console.error('message or action is not defined')
        return
      }
      set({
        confirmModalMessage: message,
        confirmModalAction: action,
        isConfirmModalOpen: true,
      })
    },
    closeConfirmModal: () => {
      set({
        confirmModalMessage: undefined,
        confirmModalAction: ModalAction.VOID,
        isConfirmModalOpen: false,
      })
    },
    setErrorMessage: (message: string) => set({ errorMessage: message }),
    clearErrorMessage: () => set({ errorMessage: undefined }),
  })),
)
