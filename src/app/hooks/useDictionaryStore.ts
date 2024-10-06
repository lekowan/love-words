import { create } from "zustand"

export interface DictionaryEntry {
  kanji?: string // Optional because some entries like "シロクマ" may not have kanji.
  kana: string // The kana reading of the word.
  definition: string[] // A list of possible definitions.
  type?: string // Optional, used for specific entries like "だ" which includes a type.
}

export interface Dictionary {
  [word: string]: DictionaryEntry[] // The key is a string (word in kanji or kana), and the value is an array of DictionaryEntry objects.
}

interface DictionaryStore {
  data: Dictionary | null
  setData: (data: Dictionary | null) => void
}

export const useDictionaryStore = create<DictionaryStore>((set) => ({
  data: {},
  setData: (data) => set(() => ({ data: data })),
}))
