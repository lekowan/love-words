import { cn } from "../../../../utils/cn"

interface CloseProps {
  onClick?: () => void
  className?: string
}

export const Close = ({ className, onClick, ...props }: CloseProps) => {
  return (
    <div
      onClick={onClick}
      className={cn("tw-pr-4 tw-cursor-pointer", className)}
      {...props}
    >
      <svg
        xmlns="https://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 0 24 24"
        width="24px"
        fill="#2a2142"
      >
        <path d="M0 0h24v24H0V0z" fill="none"></path>
        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"></path>
      </svg>
    </div>
  )
}
