import { useTranslationStore } from "@/app/hooks/useTranslationStore"
import { Button } from "../../components/button/button"
import { TranscriptDataProps } from "@/app/[...slug]/page"
import { useAudioPlayback } from "@/app/hooks/useAudioPlayback"
import { useLocalStorage } from "@/app/hooks/useLocalStorage"
import { useParams } from "next/navigation"

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

  const params = useParams() // Use useParams to access route segments
  const slug = params.slug // Access the slug from the route

  const [_, setProgress] = useLocalStorage(
    "shirokuma",
    slug as string,
    "numberOfLines"
  )
  const { playAudio } = useAudioPlayback()

  const handleContinue = () => {
    setCurrentNumberOfLines((value) => value + 1)
    setShowTranslate(true)
    const nextSlide = data[currentNumberOfLines + 1]
    playAudio(nextSlide.audio as string, nextSlide.character)
    setProgress(currentNumberOfLines + 1)
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
