import { TranscriptDataProps } from "@/app/page"
import { Card } from ".."
import { RefObject } from "react"

interface CardListProps {
  currentNumberOfLines: number
  data: TranscriptDataProps
  messageEndRef: RefObject<HTMLDivElement>
}

export const CardList = ({
  data,
  currentNumberOfLines,
  messageEndRef,
}: CardListProps) => {
  return (
    <div className="tw-px-4 md:tw-px-40 tw-max-w-[1024px] tw-pt-16 tw-h-[calc(100vh-180px)]">
      {Object.values(data)
        .slice(0, currentNumberOfLines)
        .map((item, index) => (
          <Card
            key={`${item.definition}-${index}`}
            id={index + 1}
            sentence={data[index + 1].definition}
            translation={data[index + 1].letter}
            speaker={data[index + 1].speaker}
          />
        ))}
      <div ref={messageEndRef} className="tw-h-[300px]" />
    </div>
  )
}