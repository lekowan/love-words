import { Modal } from "../modal"

interface WordHighlighterProps {
  sentence: string
}

export const WordHighlighter = ({ sentence }: WordHighlighterProps) => {
  const sentenceWithSpans = sentence
    .split(" ")
    .map((word, index) => <Modal key={`${word}-${index}`} word={word} />)

  return <>{sentenceWithSpans}</>
}
