import { create } from "zustand"

type State = {
  clickedWord: string | null
}

type Action = {
  setClickedWord: (clickedWord: string | null) => void
}

export const useWordStore = create<State & Action>((set) => ({
  clickedWord: null,
  setClickedWord: (clickedWord: any) =>
    set(() => ({ clickedWord: clickedWord })),
}))
