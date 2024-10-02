import { AudioIcon } from "../audio-icon/audio-icon"
import { TranslateIcon } from "../translate-icon"
import { WordHighlighter } from "../word-highlighter"
import { useTranslationStore } from "@/app/hooks/useTranslationStore"
import Image from "next/image"
import Icon from "../../../assets/penguin.png"

export interface DataProps {
  id: number
  sentence: string
  translation?: string
  className?: string
}

export const Card = ({ id, sentence, translation }: DataProps) => {
  const translatedWords = useTranslationStore((state) => state.data)

  return (
    <div className="my-4 flex gap-4 pr-6">
      <div className="w-12 h-12 rounded-full">
        <Image src={Icon} width={48} height={48} alt="penguin-san" />
      </div>

      <div className="max-w-[calc(100%-4rem)]">
        <div className="relative h-full">
          <div className="hand-drawn-rectangle flex flex-wrap items-center p-4">
            <span className="pr-2">
              <AudioIcon sentence={sentence} />
            </span>
            <WordHighlighter sentence={sentence} />
            <span className="pl-2">
              <TranslateIcon id={id} />
            </span>
          </div>
        </div>
        {
          <p className="h-6 font-medium text-[16px] mt-1">
            {translatedWords[id]?.translate === true && translation}
          </p>
        }
      </div>
    </div>
  )
}
