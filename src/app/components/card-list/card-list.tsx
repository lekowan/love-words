import { TranscriptDataProps } from "@/app/[...slug]/page"
import { Card } from ".."
import { RefObject } from "react"

interface CardListProps {
  currentNumberOfLines: number
  data: TranscriptDataProps
  messageEndRef: RefObject<HTMLDivElement>
  showTranslate: boolean
}

export const CardList = ({
  data,
  currentNumberOfLines,
  messageEndRef,
  showTranslate,
}: CardListProps) => {
  return (
    <div className="tw-px-4 md:tw-px-40 tw-max-w-[1024px] tw-pt-16 tw-h-[calc(100vh-180px)]">
      {Object.values(data)
        .slice(0, currentNumberOfLines)
        .map((item, index) => (
          <Card
            key={`${item.definition}-${index}`}
            id={index + 1}
            sentence={
              data[index + 1].characterWithSpace
                ? (data[index + 1].characterWithSpace as string)
                : data[index + 1].character
            }
            showTranslate={showTranslate}
            speaker={data[index + 1].speaker}
            currentNumberOfLines={currentNumberOfLines}
            definition={data[index + 1].definition}
          />
        ))}
      <div ref={messageEndRef} className="tw-h-[300px]" />
    </div>
  )
}
