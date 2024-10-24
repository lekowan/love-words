import { useEffect, useRef, useState } from "react"
import { Modal } from "../modal"
import { useNestedStorage } from "@/app/hooks/useNestedStorage"
import { useParams } from "next/navigation"

export const WordHighlighter = ({ sentence }: { sentence: string }) => {
  const params = useParams()
  const slug = params.slug // Access the slug from the route
  const triggerRef = useRef<HTMLButtonElement>(null)

  const [isOpen, setIsOpen] = useState(false)
  const [savedWord, setSavedWord] = useState("")
  const [wordData, setWordData] = useNestedStorage(
    "shirokuma",
    slug as string,
    "savedWords",
    []
  )

  const [_, setHasUpdated] = useState<string[]>(wordData)

  useEffect(() => {
    console.log("Updating savedWords from localStorage", wordData) // Debug info
    if (wordData) {
      setHasUpdated(wordData)
    }
  }, [wordData])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        triggerRef.current &&
        !triggerRef.current.contains(event.target as HTMLInputElement)
      ) {
        setIsOpen(false)
      }
    }
    document.addEventListener("click", handleClickOutside)
    return () => {
      document.removeEventListener("click", handleClickOutside)
    }
  }, [triggerRef, isOpen])

  // Handle saving words
  const handleSaveWord = (word: string) => {
    setIsOpen(true)
    setSavedWord(word)
    if (!wordData.includes(word)) {
      const updatedWordList = [...wordData, word]
      setWordData(updatedWordList) // Update localStorage directly
    }

    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel()
      const audioSentence = new SpeechSynthesisUtterance(word)
      audioSentence.lang = "ja-JP"
      window.speechSynthesis.speak(audioSentence)
    }
  }

  const sentenceWithSpans = sentence.split(" ").map((word, index) => (
    <span
      ref={triggerRef}
      key={`${word}-${index}`}
      onClick={() => handleSaveWord(word)}
      className="tw-border-b-2 tw-border-gray-300 tw-border-dotted tw-cursor-pointer tw-mr-2 data-[state=open]:tw-text-[#9b78ff] data-[state=open]:tw-font-medium"
    >
      {word}
    </span>
  ))

  return (
    <>
      {sentenceWithSpans}
      {isOpen && <Modal word={savedWord} setIsOpen={setIsOpen} />}
    </>
  )
}
