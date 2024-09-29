import { TranscriptDataProps } from "@/app/page"
import { IconBar } from "../icon-bar"
import { useEffect } from "react"
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

  useEffect(() => console.log(translatedWords))

  return (
    <div className="my-6">
      {
        <p className="h-6">
          {translatedWords[id]?.translate === true && translation}
        </p>
      }
      <WordHighlighter className="text-2xl mt-2" sentence={sentence} />
      <IconBar id={id} sentence={sentence} className="mt-2" />
    </div>
  )
}
