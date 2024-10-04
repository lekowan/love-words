import { useState, useEffect } from "react"

const getStorageValue = (key: string, defaultValue: number): number => {
  const saved = localStorage.getItem(key)
  return saved ? JSON.parse(saved) : defaultValue
}

export const useLocalStorage = (
  key: string,
  defaultValue: number
): [number, React.Dispatch<React.SetStateAction<number>>] => {
  const [value, setValue] = useState(() => {
    return getStorageValue(key, defaultValue)
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}
