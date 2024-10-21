interface ItemProps {
  title: string
  maxNumberOfLines: number | null
  progress: number | null
}

export const Item = ({ title, maxNumberOfLines, progress }: ItemProps) => {
  const progression =
    progress === maxNumberOfLines
      ? "Finished"
      : `${progress}  / ${maxNumberOfLines}`
  return (
    <>
      <div className="tw-flex tw-flex-nowrap tw-p-4 tw-items-center">
        <div className="thumbnail tw-w-14 tw-h-14 tw-shrink-0"></div>
        <div className="tw-flex tw-flex-col tw-pl-4">
          <div className="tw-text">{title}</div>
          {progress && maxNumberOfLines && (
            <div className="tw-text-sm">{progression}</div>
          )}
        </div>
      </div>
    </>
  )
}
