import { AudioIcon } from "../audio-icon/audio-icon"
import { Avatar } from "../avatar"
import { WordHighlighter } from "../word-highlighter"
import { useTranslationStore } from "@/app/hooks/useTranslationStore"

export interface DataProps {
  id: number
  sentence: string
  translation?: string
  className?: string
  speaker?: string
}

export const Card = ({ id, sentence, translation, speaker }: DataProps) => {
  const translatedWords = useTranslationStore((state) => state.data)

  return (
    <div className="tw-my-4 tw-flex tw-gap-4 tw-pr-6">
      <Avatar speaker={speaker} />

      <div className="tw-max-w-[calc(100%-4rem)]">
        <div className="hand-drawn-rectangle tw-inline-flex tw-flex-wrap tw-items-center tw-p-4">
          <span className="tw-pr-2">
            <AudioIcon sentence={sentence} />
          </span>

          <WordHighlighter sentence={sentence} />
        </div>

        {
          <p className="tw-font-medium tw-text-[16px] tw-mb-4 tw-ml-4 tw-mt-2 tw-h-auto">
            {translatedWords[id]?.translate === true && translation}
          </p>
        }
      </div>
    </div>
  )
}
