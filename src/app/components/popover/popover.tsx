"use client"

import { useWordStore } from "@/app/hooks/useWordStore"
import * as PopoverUI from "@radix-ui/react-popover"
import { dictionary } from "../../../data/shirokuma-ep3-dictionary"

interface PopoverProps {
  word: string
}

export const Popover = ({ word }: PopoverProps) => {
  const setClickedWord = useWordStore((state) => state.setClickedWord)
  const handleWordClick = (event: React.MouseEvent<HTMLElement>) => {
    const word = event.currentTarget.innerText
    setClickedWord(word)
  }

  return (
    <PopoverUI.Root>
      <PopoverUI.Trigger onClick={handleWordClick}>{word}</PopoverUI.Trigger>
      <PopoverUI.Portal>
        <PopoverUI.Content
          className="rounded p-5 w-[50%] bg-white shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] focus:shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2),0_0_0_2px_theme(colors.violet7)] will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade"
          sideOffset={5}
        >
          {dictionary[word].map((item, index) => {
            return (
              <div key={`${item.kana}-${index}`}>
                <p>{item.kana}</p>
                <p>{item.definition}</p>
              </div>
            )
          })}
          {/* <PopoverUI.Close
            className="rounded-full h-[25px] w-[25px] inline-flex items-center justify-center text-violet11 absolute top-[5px] right-[5px] hover:bg-violet4 focus:shadow-[0_0_0_2px] focus:shadow-violet7 outline-none cursor-default"
            aria-label="Close"
          ></PopoverUI.Close> */}
          <PopoverUI.Arrow className="fill-white" />
        </PopoverUI.Content>
      </PopoverUI.Portal>
    </PopoverUI.Root>
  )
}
