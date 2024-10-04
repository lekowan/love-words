export const useAudioPlayback = () => {
  const playAudio = (sentence: string) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel()
      const audioSentence = new SpeechSynthesisUtterance(sentence)
      audioSentence.lang = "ja-JP"
      window.speechSynthesis.speak(audioSentence)
    }
  }

  return { playAudio }
}
