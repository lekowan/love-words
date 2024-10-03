import Image from "next/image"
import Icon from "../../../assets/audio.png"

interface AudioIconProps {
  sentence: string
}

export const AudioIcon = ({ sentence }: AudioIconProps) => {
  const playAudio = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel()
      const sentenceString = sentence
      const audioSentence = new SpeechSynthesisUtterance(sentenceString)
      audioSentence.lang = "ja-JP"
      window.speechSynthesis.speak(audioSentence)
    }
  }

  return (
    <div className="tw-flex tw-items-center">
      <Image
        onClick={playAudio}
        src={Icon}
        width={29}
        height={24}
        alt="audio button"
      />
    </div>
  )
}
