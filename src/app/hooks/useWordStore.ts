import { create } from "zustand"

interface WordStore {
  clickedWord: string | null
  setClickedWord: (clickedWord: string | null) => void
}

export const useWordStore = create<WordStore>((set) => ({
  clickedWord: null,
  setClickedWord: (clickedWord) => set(() => ({ clickedWord: clickedWord })),
}))
