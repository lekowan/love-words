import { create } from "zustand"

// Define the type for each entry in the data
interface TranslationEntry {
  translate: boolean // Property to manage the translation status
}

// Define the store's state and actions
interface TranslationStore {
  data: Record<number, TranslationEntry> // Object to hold translation entries
  addTranslation: (id: number) => void // Method to add a new translation entry
  setTranslationStatus: (id: number) => void // Method to toggle translation status
}

// Create Zustand store with empty initial data
export const useTranslationStore = create<TranslationStore>((set) => ({
  data: {}, // Start with an empty data object
  addTranslation: (id: number) => {
    set((state) => {
      // Check if the entry already exists
      if (state.data[id]) return state // Prevent overwriting existing entries

      // Add a new entry with translate set to false by default
      return {
        data: {
          ...state.data,
          [id]: { translate: false }, // Initialize with translate set to false
        },
      }
    })
  },
  setTranslationStatus: (id: number) => {
    set((state) => {
      const currentEntry = state.data[id]
      if (!currentEntry) return state // Guard clause if entry doesn't exist

      // Toggle the translate property
      const updatedData = {
        ...state.data,
        [id]: {
          ...currentEntry,
          translate: !currentEntry.translate,
        },
      }
      return { data: updatedData }
    })
  },
}))
