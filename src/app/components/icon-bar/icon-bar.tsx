"use client"

export const IconBar = ({ id, setData, data }: any) => {
  const toggleTranslate = () => {
    const translateValue = data[id].translate
    const updatedObj = {
      ...data,
      [id]: {
        ...data[id],
        translate: !translateValue,
      },
    }

    setData(() => updatedObj)
  }

  const playAudio = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel()
      const sentenceString = data[id].character
      console.log(sentenceString)
      const audioSentence = new SpeechSynthesisUtterance(sentenceString)
      audioSentence.lang = "ja-JP"
      audioSentence.volume = 5
      window.speechSynthesis.speak(audioSentence)
      console.log(audioSentence)
    }
  }

  return (
    <div className="flex gap-x-2 mt-4">
      <svg
        onClick={() => toggleTranslate()}
        xmlns="http://www.w3.org/2000/svg"
        height="16px"
        viewBox="0 -960 960 960"
        width="18px"
        fill="#18093e"
      >
        <path d="m476-80 182-480h84L924-80h-84l-43-122H603L560-80h-84ZM160-200l-56-56 202-202q-35-35-63.5-80T190-640h84q20 39 40 68t48 58q33-33 68.5-92.5T484-720H40v-80h280v-80h80v80h280v80H564q-21 72-63 148t-83 116l96 98-30 82-122-125-202 201Zm468-72h144l-72-204-72 204Z" />
      </svg>

      <svg
        onClick={() => playAudio()}
        xmlns="http://www.w3.org/2000/svg"
        height="18px"
        viewBox="0 -960 960 960"
        width="18px"
        fill="#18093e"
      >
        <path d="m380-300 280-180-280-180v360ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
      </svg>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="18px"
        viewBox="0 -960 960 960"
        width="18px"
        fill="#18093e"
      >
        <path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
      </svg>
    </div>
  )
}
