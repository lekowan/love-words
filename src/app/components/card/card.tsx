import { AudioIcon } from "../audio-icon/audio-icon"
import { TranslateIcon } from "../translate-icon"
import { WordHighlighter } from "../word-highlighter"
import { useTranslationStore } from "@/app/hooks/useTranslationStore"

export interface DataProps {
  id: number
  sentence: string
  translation?: string
  className?: string
}

export const Card = ({ id, sentence, translation }: DataProps) => {
  const translatedWords = useTranslationStore((state) => state.data)

  return (
    <div className="my-4 flex gap-4">
      <div className="w-8 h-8 bg-pink-500 rounded-full"></div>

      <div>
        <div className="relative">
          <div className="hand-drawn-rectangle flex flex-wrap items-center p-4">
            <WordHighlighter sentence={sentence} />
          </div>
          <div className="absolute -top-0 -right-[15px]">
            <AudioIcon sentence={sentence} />
          </div>
          <div className="absolute -bottom-[-32px] -right-[25px]">
            <TranslateIcon id={id} />
          </div>
        </div>
        {
          <p className="h-6 font-medium text-[#754fe3] text-[16px] mt-1">
            {translatedWords[id]?.translate === true && translation}
          </p>
        }
      </div>
    </div>
  )
}
