"use client"

import {
  HTMLAttributes,
  forwardRef,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react"
import parse from "html-react-parser"
import { cn } from "../../../../utils/cn"

const Wrapper = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, children, content, ...props }, ref) => {
    return (
      <div className="tw-relative" {...props} ref={ref}>
        {children}
      </div>
    )
  }
)

Wrapper.displayName = "Popover.Wrapper"

const Trigger = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement> & {
    children: string
  }
>(({ className, children, content, ...props }, ref) => {
  const [show, setShow] = useState(false)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const rightMarkerRef = useRef<HTMLDivElement>(null)
  const [topOffset, setTopOffset] = useState(0)
  const [leftOffset, setLeftOffset] = useState(0)
  const [arrowLeftOffset, setArrrowLeftOffset] = useState(0)
  const [lastWindowResizeEvent, setLastWindowResizeEvent] = useState<UIEvent>()

  const markedUpString = children
    .replace(/(\w+)/g, '<span class="trigger-word">$&</span>')
    .replace("> <", '><span class="trigger-word"> </span><')
  const markedUpNode = parse(markedUpString)

  const positionTooltip = (
    parentElement: HTMLElement,
    triggerElement: HTMLElement,
    tooltipElement: HTMLElement
  ) => {
    // Get parent padding
    const computedParent = getComputedStyle(parentElement)
    const parentLeftPadding = parseFloat(computedParent.paddingLeft)

    // Get parent width (no margin, no padding)
    const parentWidth = Math.ceil(parentElement.getBoundingClientRect().width)

    // Get tooltip width
    const tooltipWidth = Math.ceil(tooltipElement.getBoundingClientRect().width)

    // Calculate tooltip top offset in relation to trigger text position and parent top edge
    const triggerTextYPos = triggerElement.offsetTop
    const tooltipHeight = tooltipElement.clientHeight
    const topOffsetValue = triggerTextYPos - tooltipHeight - 4

    // Collect all triggerText spans from the first line
    // Ignore right marker and parent span
    // Total up the spans width
    const triggerTextSpanArray: any[] = [
      // ...triggerElement.getElementsByClassName("trigger-word"),
    ]
    const lastTriggerTextWord = triggerTextSpanArray.filter((span: any) => {
      return span.offsetTop === triggerTextYPos
    })
    const firstLineTriggerWidth = lastTriggerTextWord.reduce(
      (acc, span) => acc + Math.ceil(span.getBoundingClientRect().width),
      0
    )

    // Calculate tooltip left offset in relation to trigger text position and parent left edge
    const triggerTextLeftXPos = triggerElement.offsetLeft

    // Get initial left offset value when tooltip is centered align over the trigger text
    /* istanbul ignore next - cannot test width in jsdom */
    const initialLeftOffset =
      triggerTextLeftXPos - tooltipWidth / 2 + firstLineTriggerWidth / 2

    let leftOffsetValue = 0
    let arrowLeftOffsetValue = 0

    // Final tooltip positioning
    // If tooltip goes over the parent left edge (minus padding), left-align it with the parent
    /* istanbul ignore next - cannot test width in jsdom */
    if (initialLeftOffset - parentLeftPadding < 0) {
      leftOffsetValue = parentLeftPadding

      // Position the arrow over the middle of the trigger text (first line if wrapper or whole line if not)
      arrowLeftOffsetValue =
        triggerTextLeftXPos - parentLeftPadding + firstLineTriggerWidth / 2 - 6
    }
    // If tooltip goes over the parent right edge (minus padding), right-align it with the parent
    else if (
      initialLeftOffset - parentLeftPadding + tooltipWidth >
      parentWidth
    ) {
      leftOffsetValue = parentWidth + parentLeftPadding - tooltipWidth

      // Position the arrow over the middle of the trigger text (first line if wrapper or whole line if not)
      arrowLeftOffsetValue =
        tooltipWidth -
        (parentWidth - triggerTextLeftXPos + parentLeftPadding) +
        firstLineTriggerWidth / 2 -
        6
    } else {
      leftOffsetValue = initialLeftOffset

      // Position the arrow over the middle of the trigger text
      arrowLeftOffsetValue = tooltipWidth / 2 - 6
    }

    // Set Tooltip body width, topOffset and leftOfset values in state
    setTopOffset(() => topOffsetValue)
    setLeftOffset(() => leftOffsetValue)
    setArrrowLeftOffset(arrowLeftOffsetValue)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        triggerRef.current &&
        !triggerRef.current.contains(event.target as HTMLInputElement)
      ) {
        setShow(false)
      }
    }
    document.addEventListener("click", handleClickOutside)
    return () => {
      document.removeEventListener("click", handleClickOutside)
    }
  }, [triggerRef])

  useEffect(() => {
    const handlePressEnter = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        event.preventDefault()
        triggerRef.current?.click()
      }
    }
    if (triggerRef.current && !show) {
      triggerRef.current.addEventListener("keypress", handlePressEnter)
      return () => {
        triggerRef.current?.addEventListener("keypress", handlePressEnter)
      }
    }
  }, [triggerRef, show])

  useEffect(() => {
    const handleResize = (e: UIEvent) => {
      setLastWindowResizeEvent(e)
    }
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  useLayoutEffect(() => {
    const parentElement = tooltipRef.current?.parentElement
    const triggerElement = triggerRef.current
    const tooltipElement = tooltipRef.current
    if (parentElement && triggerElement && tooltipElement) {
      positionTooltip(parentElement, triggerElement, tooltipElement)
    }
  }, [lastWindowResizeEvent])

  return (
    <>
      <div
        className={cn("tw-inline tw-h-6 tw-cursor-pointer tw-text-blue-600")}
        ref={ref}
        {...props}
      >
        <button
          className={cn(
            "tw-inline focus-visible:tw-bg-gray-700 focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-focusRing"
          )}
          ref={triggerRef}
          tabIndex={show ? -1 : 0}
          onClick={() => {
            setShow(!show)
          }}
          aria-label="Toggle popover"
        >
          <p>
            {/* Adding 'tw-bg-[length:5px_1.5px]' at the end as it is not supported by tw-merge */}
            <span
              className={`${cn(
                "tw-bg-dash tw-bg-[0_20px] tw-bg-repeat-x tw-text-link"
              )} tw-bg-[length:5px_1.5px]`}
            >
              {markedUpNode}
            </span>

            <span ref={rightMarkerRef}></span>
          </p>
        </button>
      </div>
      <div
        ref={tooltipRef}
        style={{
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          top: `${topOffset}px`,
          left: `${leftOffset}px`,
        }}
        data-testid="popover"
        className={cn(
          "tw-absolute tw-left-0 tw-flex tw-rounded-2xl tw-border tw-border-blue70 tw-bg-blue-100 tw-p-6 tw-text-sm tw-text-gray-500 tw-shadow-popover after:tw-left-8",
          "tw-opacity-0 tw-transition-all -tw-z-10",
          {
            "-tw-translate-y-1 tw-cursor-pointer tw-opacity-100 tw-duration-300 tw-ease-in-out tw-z-10":
              show,
            "tw-cursor-default tw-duration-100 tw-ease-sharp -tw-z-10": !show,
          }
        )}
      >
        <span className="tw-mr-2 tw-cursor-default tw-self-center tw-pr-1">
          {content}
        </span>
        <button
          data-testid="close"
          onClick={() => {
            setShow(false)
          }}
          className={cn(
            "tw-min-w-max tw-self-baseline",
            "focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-focusRing"
          )}
          aria-label="Close popover"
          tabIndex={show ? 0 : -1}
        ></button>
        <div
          style={{
            left: `${arrowLeftOffset}px`,
          }}
          className="tw-absolute -tw-bottom-[6.5px] tw-h-3 tw-w-3 tw-rotate-45 tw-border tw-border-l-0 tw-border-t-0 tw-border-blue70 tw-bg-blue90"
        ></div>
      </div>
    </>
  )
})

Trigger.displayName = "Popover.Trigger"

export { Wrapper, Trigger }
