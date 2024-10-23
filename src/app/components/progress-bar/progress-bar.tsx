import { cn } from "../../../../utils/cn"
import { ProgressProps } from "../progress"

export const ProgressBar = ({
  progressEnd,
  progressStart,
  className,
}: ProgressProps) => {
  const progressValue = (progressStart * 100) / progressEnd

  return (
    <div
      className={cn(
        "tw-bg-[#ecebee] tw-h-3 tw-rounded-md tw-w-[90%] tw-border-1 tw-border-gray-500 tw-relative",
        className
      )}
    >
      <span
        style={{ width: `${progressValue}%` }}
        className={"tw-h-full tw-absolute purple-gradient tw-rounded-full"}
      ></span>
    </div>
  )
}
