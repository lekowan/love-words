import { useEffect, useState } from "react"

const getStorageValue = (episode: string, item: string): number | null => {
  if (typeof window === "undefined") return null // Check if it's running in a browser
  const key = `${episode}-${item}`
  const saved = localStorage.getItem(key)
  return saved ? JSON.parse(saved) : null
}

// Custom hook for localStorage
export const useLocalStorage = (
  episode: string,
  item: string
): [number | null, React.Dispatch<React.SetStateAction<number | null>>] => {
  const [value, setValue] = useState<number | null>(() => {
    // Ensure this is client-side only
    if (typeof window !== "undefined") {
      return getStorageValue(episode, item)
    }
    return null
  })

  const key = `${episode}-${item}`

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(key, JSON.stringify(value))
    }
  }, [key, value])

  return [value, setValue]
}
