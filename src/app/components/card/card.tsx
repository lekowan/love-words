import { AudioPlayer, WordHighlighter, Avatar, AvatarProps } from ".."

export interface DataProps {
  id: number
  sentence: string
  currentNumberOfLines: number
  className?: string
  speaker?: AvatarProps["speaker"]
  showTranslate: boolean
  definition: string
  audio: string
}

export const Card = ({
  id,
  sentence,
  speaker,
  currentNumberOfLines,
  showTranslate,
  definition,
  audio,
}: DataProps) => {
  return (
    <div className="tw-my-4 tw-flex tw-gap-2 md:tw-gap-4">
      {speaker && <Avatar speaker={speaker} />}

      <div className="tw-w-full">
        <div className="hand-drawn-rectangle tw-inline-flex tw-flex-wrap tw-items-center tw-p-4">
          <span className="tw-pr-2">
            <AudioPlayer sentence={sentence} audio={audio} />
          </span>

          <WordHighlighter sentence={sentence} />
        </div>

        {
          <p className="tw-font-medium tw-text-[16px] tw-mb-4 tw-ml-4 tw-mt-2 tw-h-auto">
            {(id < currentNumberOfLines ||
              (id === currentNumberOfLines && showTranslate === false)) &&
              definition}
          </p>
        }
      </div>
    </div>
  )
}
