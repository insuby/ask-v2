import { create } from 'zustand'

interface IUseRole {
  activeRole: string
  setActiveRole: (role: string) => void
}

export const useRole = create<IUseRole>((set) => ({
  activeRole:
    typeof window !== 'undefined'
      ? localStorage.getItem('activeRole') || 'buyer'
      : 'buyer',
  setActiveRole: (role: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('activeRole', role)
    }
    set(() => ({ activeRole: role }))
  },
}))
