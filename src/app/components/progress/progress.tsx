import { ProgressBar } from ".."
import { cn } from "../../../../utils/cn"

export interface ProgressProps {
  progressStart: number
  progressEnd: number
  className?: string
}

export const Progress = ({
  progressStart,
  progressEnd,
  className,
}: ProgressProps) => {
  return (
    <>
      <div
        className={cn(
          "tw-min-h-12 tw-flex w-full tw-items-center tw-justify-between tw-px-5",
          className
        )}
      >
        <div className="tw-flex tw-justify-center tw-items-center tw-w-full">
          <ProgressBar
            progressStart={progressStart}
            progressEnd={progressEnd}
          />
          <p className="tw-ml-4 tw-min-w-fit tw-text-[11px] tw-font-black">
            {progressStart} <span className="tw-px-3">/</span> {progressEnd}
          </p>
        </div>
      </div>
    </>
  )
}

export default Progress
