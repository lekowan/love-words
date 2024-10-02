"use client"

import { useWordStore } from "@/app/hooks/useWordStore"
import * as Dialog from "@radix-ui/react-dialog"
import { dictionary } from "../../../data/shirokuma-ep3-dictionary"

interface DialogProps {
  word: string
}

export const Modal = ({ word }: DialogProps) => {
  const setClickedWord = useWordStore((state) => state.setClickedWord)
  const handleWordClick = (event: React.MouseEvent<HTMLElement>) => {
    const word = event.currentTarget.innerText
    setClickedWord(word)
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <span
          onClick={handleWordClick}
          className="data-[state=open]:text-[#754fe3] border-b-2 border-gray-300 border-dotted text-[21px] font-medium cursor-pointer mr-2"
        >
          {word}
        </span>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-blackA6 fixed inset-0" />
        <Dialog.Content className="transition-transform fixed w-full bottom-0 left-0 data-[state=open]:translate-y-[0] data-[state=closed]:translate-y-[50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <Dialog.Description className="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal">
            {dictionary[word].map((item, index) => {
              return (
                <div key={`${item.kana}-${index}`}>
                  <Dialog.Title>{item.kana}</Dialog.Title>
                  <Dialog.Description>{item.definition}</Dialog.Description>
                </div>
              )
            })}
          </Dialog.Description>

          <Dialog.Close asChild>
            <button
              className="border-none text-gray-800 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
              aria-label="Close"
            ></button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
