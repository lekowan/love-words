import { useWordStore } from "@/app/hooks/useWordStore"

interface WordHighlighterProps {
  sentence: string
  className: String
}

export const WordHighlighter = ({ sentence }: WordHighlighterProps) => {
  const setClickedWord = useWordStore((state) => state.setClickedWord)

  const handleWordClick = (event: React.MouseEvent<HTMLElement>) => {
    const word = event.currentTarget.innerText
    setClickedWord(word)
  }

  const sentenceWithSpans = sentence.split(" ").map((word, index) => (
    <span key={index} onClick={handleWordClick}>
      {word}
    </span>
  ))

  return <p>{sentenceWithSpans}</p>
}
