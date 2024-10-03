import { AudioIcon } from "../audio-icon/audio-icon"
import { TranslateIcon } from "../translate-icon"
import { WordHighlighter } from "../word-highlighter"
import { useTranslationStore } from "@/app/hooks/useTranslationStore"
import Image from "next/image"
import Icon from "../../../assets/penguin.png"
import { Popover } from "../popover"
import { cn } from "../../../../utils/cn"
import { dictionary } from "@/data/shirokuma-ep3-dictionary"

export interface DataProps {
  id: number
  sentence: string
  translation?: string
  className?: string
}

export const Card = ({ id, sentence, translation }: DataProps) => {
  const translatedWords = useTranslationStore((state) => state.data)

  return (
    <div className="tw-my-4 tw-flex tw-gap-4 tw-pr-6">
      <div className="tw-w-12 tw-h-12 tw-rounded-full">
        <Image src={Icon} width={48} height={48} alt="penguin-san" />
      </div>

      <div className="tw-max-w-[calc(100%-4rem)]">
        <div className="tw-relative">
          <div className="hand-drawn-rectangle tw-flex tw-flex-wrap tw-items-center tw-p-4">
            <span className="tw-pr-2">
              <AudioIcon sentence={sentence} />
            </span>
            {/* <Popover.Wrapper>
              {sentence.split(" ").map((word, index) => (
                <>
                  <Popover.Trigger
                    key={`${word}-${index}`}
                    content={dictionary[word][0].definition[0]}
                  >
                    {word}
                  </Popover.Trigger>
                  <span>&nbsp; &nbsp;</span>
                </>
              ))}
            </Popover.Wrapper> */}

            <WordHighlighter sentence={sentence} />
            <span className="tw-pl-2">
              <TranslateIcon id={id} />
            </span>
          </div>
        </div>
        {
          <p className="tw-font-medium tw-text-[16px] tw-mb-1 tw-ml-4 tw-mt-2 tw-h-auto">
            {translatedWords[id]?.translate === true && translation}
          </p>
        }
      </div>
    </div>
  )
}
