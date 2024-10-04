// import { useWordStore } from "./hooks/useWordStore"
import { useTranslationStore } from "@/app/hooks/useTranslationStore"
import { Button } from "../../components/button/button"
import { useState } from "react"
import { TranscriptDataProps } from "@/app/page"
import { useAudioPlayback } from "@/app/hooks/useAudioPlayback"
import { useLocalStorage } from "@/app/hooks/useLocalStorage"

interface CardListControlsProps {
  data: TranscriptDataProps
  currentNumberOfLines: number
  showTranslate: boolean
  setShowTranslate: React.Dispatch<React.SetStateAction<boolean>>
  setCurrentNumberOfLines: React.Dispatch<React.SetStateAction<number>>
}

export const CardListControls = ({
  data,
  currentNumberOfLines,
  showTranslate,
  setShowTranslate,
  setCurrentNumberOfLines,
}: CardListControlsProps) => {
  const addTranslation = useTranslationStore((state) => state.addTranslation)
  const setTranslationStatus = useTranslationStore(
    (state) => state.setTranslationStatus
  )

  const [_, setNumberOfLinesInLocalStorage] = useLocalStorage("numberOfLine", 1)

  const { playAudio } = useAudioPlayback()

  const handleContinue = () => {
    setCurrentNumberOfLines((value) => value + 1)
    setShowTranslate(true)
    const line = data[currentNumberOfLines + 1].character
    playAudio(line)
    setNumberOfLinesInLocalStorage(currentNumberOfLines + 1)
  }

  const handleTranslate = () => {
    addTranslation(currentNumberOfLines)
    setTranslationStatus(currentNumberOfLines)
    setShowTranslate(false)
  }

  return (
    <div className="tw-fixed tw-bottom-0 tw-h-24 tw-bg-white tw-flex tw-justify-center tw-items-center tw-w-full tw-px-4">
      {showTranslate && (
        <Button
          onClick={handleTranslate}
          variant="primary"
          className="tw-w-[500px] tw-max-w-96"
        >
          Translate
        </Button>
      )}
      {!showTranslate && (
        <Button
          onClick={handleContinue}
          variant="secondary"
          className="tw-w-[500px] tw-max-w-96"
        >
          Continue
        </Button>
      )}
    </div>
  )
}
