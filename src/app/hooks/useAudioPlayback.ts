export const useAudioPlayback = () => {
  const playAudio = (audio: string, sentence: string) => {
    if (audio) {
      const audioObj = new Audio(audio)
      audioObj.play().catch((error) => {
        console.error("Error playing audio:", error)

        if ("speechSynthesis" in window) {
          window.speechSynthesis.cancel()
          const audioSentence = new SpeechSynthesisUtterance(sentence)
          audioSentence.lang = "ja-JP"
          window.speechSynthesis.speak(audioSentence)
        }
      })
    }
  }
  return { playAudio }
}
