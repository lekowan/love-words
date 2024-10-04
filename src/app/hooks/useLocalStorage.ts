import { useEffect, useState } from "react"

// Function to get the stored value from localStorage
const getStorageValue = (key: string, defaultValue: number): number => {
  if (typeof window === "undefined") {
    return defaultValue // Return default value if running on the server
  }
  const saved = localStorage.getItem(key)
  return saved ? JSON.parse(saved) : defaultValue
}

// Custom hook for localStorage
export const useLocalStorage = (
  key: string,
  defaultValue: number
): [number, React.Dispatch<React.SetStateAction<number>>] => {
  const [value, setValue] = useState(() => {
    return getStorageValue(key, defaultValue)
  })

  useEffect(() => {
    // Ensure localStorage is only accessed in the client
    if (typeof window !== "undefined") {
      localStorage.setItem(key, JSON.stringify(value))
    }
  }, [key, value])

  return [value, setValue]
}
