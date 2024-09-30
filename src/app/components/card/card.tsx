import { IconBar } from "../icon-bar"
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
    <div className="my-4 flex">
      <div className="w-5">
        <span className="w-4 h-4 bg-pink-500 rounded-full"></span>
      </div>
      <div>
        <div className="flex flex-wrap items-center">
          <WordHighlighter sentence={sentence} />
          <IconBar id={id} sentence={sentence} />
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
