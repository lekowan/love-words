import { ProgressBar } from ".."

interface ItemProps {
  title: string
  maxNumberOfLines: number | null
  progress: number | null
}

export const Item = ({ title, maxNumberOfLines, progress }: ItemProps) => {
  const isComplete = progress === maxNumberOfLines
  const [episode, part] = title.replace(/[^0-9.]/g, "").split(".")
  const strippedTitle = title.replace(/[0-9.]/g, "")

  return (
    <>
      <div className="tw-flex tw-flex-nowrap tw-p-4 tw-items-center">
        {/* <div className="thumbnail tw-w-14 tw-h-14 tw-shrink-0"></div> */}
        <div className="tw-flex tw-flex-col tw-pl-4">
          <div className="tw-text-sm tw-text-[#9788c6]">
            Episode {episode} <span>part {part}</span>
          </div>
          <div className="tw-text">{strippedTitle}</div>
          {progress && maxNumberOfLines && !isComplete && (
            <ProgressBar
              className="tw-h-1 tw-w-32 tw-mt-1"
              progressEnd={maxNumberOfLines}
              progressStart={progress}
            />
          )}
          {isComplete && maxNumberOfLines !== null && (
            <div className="tw-text-sm">Finished</div>
          )}
          {(progress == null || progress < 2) && (
            <div className="tw-text-sm">Not started</div>
          )}
        </div>
      </div>
    </>
  )
}
