import { create } from 'zustand'

interface IModalChooseRoleState {
  modalChooseRole: boolean
  setModalChooseRole: (value: boolean) => void
}

export const modalChooseRoleStore = create<IModalChooseRoleState>((set) => ({
  modalChooseRole: false,
  setModalChooseRole: (value: boolean) => set({ modalChooseRole: value }),
}))
