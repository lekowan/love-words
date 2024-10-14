"use client"

import { useEffect, useState } from "react"

// Function to get the nested stored value from localStorage
const getStorageValue = (
  animeKey: string,
  episodeKey: string,
  contentKey: string
): any => {
  const defaultValue = null

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
export const useLocalStorage = (
  animeKey: string,
  episodeKey: string,
  contentKey: any
): [any, React.Dispatch<React.SetStateAction<any>>] => {
  const [value, setValue] = useState(() => {
    return getStorageValue(animeKey, episodeKey, contentKey)
  })

  useEffect(() => {
    // Ensure localStorage is only accessed in the client
    if (typeof window !== "undefined") {
      const existingData = localStorage.getItem(animeKey)
      let parsedData: Record<string, any> = {}

      if (existingData) {
        try {
          parsedData = JSON.parse(existingData) || {}
        } catch (error) {
          console.error("Error parsing localStorage data:", error)
        }
      }

      // Update the nested object structure
      const updatedData = {
        ...parsedData,
        [episodeKey]: {
          ...(parsedData[episodeKey] || {}),
          [contentKey]: value,
        },
      }

      localStorage.setItem(animeKey, JSON.stringify(updatedData))
    }
  }, [animeKey, episodeKey, contentKey, value])

  return [value, setValue]
}
