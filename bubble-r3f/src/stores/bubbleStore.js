import { create } from 'zustand'

export const useBubbleStore = create((set) => ({
    targetIndex: 1,
    setTargetIndex: (index) => set({ targetIndex: index }),
}))