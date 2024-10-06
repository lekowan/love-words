import { Modal } from "../modal"

export const WordHighlighter = ({ sentence }: { sentence: string }) => {
  const sentenceWithSpans = sentence
    .split(" ")
    .map((word, index) => <Modal key={`${word}-${index}`} word={word} />)

  return <>{sentenceWithSpans}</>
}
