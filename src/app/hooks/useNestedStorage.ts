"use client"

import { produce } from "immer"
import { useEffect, useState } from "react"

const getStorageValue = (
  animeKey: string,
  episodeKey: string,
  contentKey: string,
  defaultValue: string[]
): string[] => {
  if (typeof window === "undefined") {
    return defaultValue // Return default value if running on the server
  }

  const saved = localStorage.getItem(animeKey)

  if (saved) {
    try {
      const parsed = JSON.parse(saved)
      return parsed?.[episodeKey]?.[contentKey] ?? defaultValue // Access the nested structure
    } catch (error) {
      console.error("Error parsing localStorage:", error)
      return defaultValue
    }
  }

  return defaultValue
}

// Custom hook for localStorage
export const useNestedStorage = (
  animeKey: string,
  episodeKey: string,
  contentKey: string,
  defaultValue: string[]
): [string[], React.Dispatch<React.SetStateAction<string[]>>] => {
  const [value, setValue] = useState(() => {
    return getStorageValue(animeKey, episodeKey, contentKey, defaultValue)
  })

  useEffect(() => {
    if (typeof window !== "undefined") {
      const existingData = localStorage.getItem(animeKey)
      let parsedData: Record<string, Record<string, string[]>> = {}

      if (existingData) {
        try {
          parsedData = JSON.parse(existingData) || {}
        } catch (error) {
          console.error("Error parsing localStorage data:", error)
        }
      }

      // Update the nested object structure
      const updatedData = produce(
        parsedData,
        (draft: { [x: string]: { [x: string]: string[] } }) => {
          if (!draft[episodeKey]) draft[episodeKey] = {} // Ensure episodeKey exists
          draft[episodeKey][contentKey] = value // Update contentKey
        }
      )

      // Save the updated structure back to localStorage
      localStorage.setItem(animeKey, JSON.stringify(updatedData))
    }
  }, [animeKey, episodeKey, contentKey, value])

  return [value, setValue]
}
