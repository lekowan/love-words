import { cn } from "../../../../utils/cn"
import { Close, Progress } from ".."
import Link from "next/link"

interface HeaderProps {
  className: string
  progressStart: number
  progressEnd: number
}

export const Header = ({
  className,
  progressStart,
  progressEnd,
}: HeaderProps) => {
  return (
    <div
      className={cn(
        "tw-w-full tw-flex tw-justify-around tw-h-20 tw-bg-white tw-items-center",
        className
      )}
    >
      <Progress
        className={cn("tw-w-full")}
        progressStart={progressStart}
        progressEnd={progressEnd}
      />
      <Link href="../">
        <Close />
      </Link>
    </div>
  )
}
