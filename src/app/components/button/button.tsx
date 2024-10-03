import { ButtonHTMLAttributes, FC } from "react"
import { cn } from "../../../../utils/cn"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: "primary" | "secondary"
}

export const Button = ({
  children,
  className,
  variant,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(
        "tw-cursor-pointer tw-text-[11px] tw-text-center tw-py-3 tw-tracking-[2px] tw-rounded-full tw-uppercase tw-font-semibold",
        { "purple-gradient": variant === "primary" },
        { "dark-blue": variant === "secondary" },
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
