import { cn } from "../../../../utils/cn"

interface ProgressProps {
  progressStart: number
  progressEnd: number
  className: string
}

export const Progress = ({
  progressStart,
  progressEnd,
  className,
}: ProgressProps) => {
  const progressVal = (progressStart * 100) / progressEnd

  return (
    <>
      <div
        className={cn(
          "tw-min-h-12 tw-flex w-full tw-items-center tw-justify-between tw-px-5",
          className
        )}
      >
        <div className="tw-flex tw-justify-center tw-items-center tw-w-full">
          <div className="tw-bg-[#ecebee] tw-h-3 tw-rounded-md tw-w-[90%] tw-border-1 tw-border-gray-500">
            <span
              style={{ width: `${progressVal}%` }}
              className={"tw-h-3 tw-absolute tw-bg-[#f691fa] tw-rounded-full"}
            ></span>
          </div>
          <p className="tw-ml-4 tw-min-w-fit">
            {progressStart} / {progressEnd}
          </p>
        </div>
      </div>
    </>
  )
}

export default Progress