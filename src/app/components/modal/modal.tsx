"use client"

import { useDictionaryStore } from "@/app/hooks/useDictionaryStore"
import { Close } from ".."

interface ModalProps {
  word: string
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const Modal = ({ word, setIsOpen }: ModalProps) => {
  const dictionary = useDictionaryStore((state) => state.data)

  return (
    <div className="tw-bg-blackA6 tw-fixed tw-inset-0 tw-z-10">
      <div className="tw-h-[280px] tw-p-4 tw-transition-transform tw-fixed tw-w-full tw-bottom-0 tw-left-0 data-[state=open]:tw-translate-y-[0] data-[state=closed]:tw-translate-y-[50%] tw-rounded-[6px] tw-bg-white p-[25px] tw-shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:tw-outline-none">
        {dictionary && dictionary[word] ? (
          dictionary[word].map((item, index) => (
            <div
              className="tw-mt-8 tw-mb-5 tw-text-[15px] tw-overflow-y-auto tw-h-[calc(100%-3.25rem)]"
              key={`${item.kana}-${index}`}
            >
              <p>
                {item.kanji && <span>{item.kanji}</span>}
                {item.kanji && item.kanji !== item.kana && <span> / </span>}
                {item.kanji !== item.kana && <span>{item.kana}</span>}
              </p>

              <div>{item.definition.join(", ")}</div>
            </div>
          ))
        ) : (
          <p>Word not found in dictionary.</p>
        )}

        <Close
          onClick={() => setIsOpen(false)}
          className={"tw-absolute tw-top-4 tw-right-0"}
          aria-label="Close"
        ></Close>
      </div>
    </div>
  )
}
