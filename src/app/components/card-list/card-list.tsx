import { TranscriptDataProps } from "@/app/[...slug]/page"
import { AvatarProps, Card } from ".."
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
        .map((item, index) => {
          const card = data[index + 1]
          return (
            <Card
              key={`${item.definition}-${index}`}
              id={index + 1}
              sentence={
                card.characterWithSpace
                  ? (card.characterWithSpace as string)
                  : card.character
              }
              showTranslate={showTranslate}
              speaker={card.speaker as AvatarProps["speaker"]}
              currentNumberOfLines={currentNumberOfLines}
              definition={card.definition}
              audio={card.audio}
            />
          )
        })}
      <div ref={messageEndRef} className="tw-h-[300px]" />
    </div>
  )
}
