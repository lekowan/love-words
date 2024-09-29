"use client"

interface PopoverProps {
  sentence: string
}

export const Popover = ({ sentence }: PopoverProps) => {
  const sentenceWithSpans = sentence
    .split(" ")
    .map((word: string) => `<span>${word}</span>`)
    .join(" ")

  const sentenceObj = { __html: sentenceWithSpans }

  return <p className="text-2xl mt-2" dangerouslySetInnerHTML={sentenceObj}></p>
}
