import { create } from 'zustand'

export const useBubbleStore = create((set) => ({
    targetIndex: 0,
    setTargetIndex: (index) => set({ targetIndex: index }),
}))