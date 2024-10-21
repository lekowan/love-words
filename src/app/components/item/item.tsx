interface ItemProps {
  title: string
  maxNumberOfLines: number | null
  progress: number | null
}

export const Item = ({ title, maxNumberOfLines, progress }: ItemProps) => {
  return (
    <>
      <div className="tw-flex tw-flex-nowrap tw-p-4 tw-items-center">
        <div className="thumbnail tw-w-14 tw-h-14"></div>
        <div className="tw-p-4">{title}</div>
        {progress && maxNumberOfLines && (
          <div>
            {progress} / {maxNumberOfLines}
          </div>
        )}
      </div>
    </>
  )
}
