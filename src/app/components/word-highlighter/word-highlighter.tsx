import { Modal } from "../modal"
// import { Popover } from "../popover"

interface WordHighlighterProps {
  sentence: string
}

export const WordHighlighter = ({ sentence }: WordHighlighterProps) => {
  const sentenceWithSpans = sentence.split(" ").map((word, index) => (
    // <Popover key={`${word}-${index}`} word={word} />
    <Modal key={`${word}-${index}`} word={word} />
  ))

  return <div className="inline">{sentenceWithSpans}</div>
}
