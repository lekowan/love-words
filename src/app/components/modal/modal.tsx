import { useDictionaryStore } from "@/app/hooks/useDictionaryStore"
import * as Dialog from "@radix-ui/react-dialog"

export const Modal = ({ word }: { word: string }) => {
  const dictionary = useDictionaryStore((state) => state.data)
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <span className="tw-border-b-2 tw-border-gray-300 tw-border-dotted tw-cursor-pointer tw-mr-2 data-[state=open]:tw-text-[#EB42EE] data-[state=open]:tw-font-medium">
          {word}
        </span>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="tw-bg-blackA6 tw-fixed tw-inset-0" />
        <Dialog.Content className="tw-max-h-[200px] tw-p-4 tw-transition-transform tw-fixed tw-w-full tw-bottom-0 tw-left-0 data-[state=open]:tw-translate-y-[0] data-[state=closed]:tw-translate-y-[50%] tw-rounded-[6px] tw-bg-white p-[25px] tw-shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:tw-outline-none">
          {dictionary && dictionary[word] ? (
            dictionary[word].map((item, index) => (
              <div
                className="tw-mt-[10px] tw-mb-5 tw-text-[15px]"
                key={`${item.kana}-${index}`}
              >
                <Dialog.Title>{item.kana}</Dialog.Title>
                <Dialog.Description>
                  {item.definition.join(", ")}
                </Dialog.Description>
              </div>
            ))
          ) : (
            <p>Word not found in dictionary.</p>
          )}

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
