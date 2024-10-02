"use client"

import { useEffect, useRef, useState } from "react"
import { transcriptData } from "../data/shirokuma-ep3"
import { Card } from "./components/card"
import { Header } from "./components/header"
import { useWordStore } from "./hooks/useWordStore"

export interface TranscriptDataEntry {
  character: string
  letter: string
  pinyin: string
  definition: string
  pinyinSpace: string
  translate?: boolean
}

export interface TranscriptDataProps {
  [key: number]: TranscriptDataEntry
}

export default function Home() {
  const data: TranscriptDataProps = transcriptData
  const clickedWord = useWordStore((state) => state.clickedWord)
  const [numberOfSentences, setNumberOfSentences] = useState<number>(1)

  useEffect(() => console.log(clickedWord))

  const handleNext = () => {
    setNumberOfSentences((value) => value + 1)
  }

  const messagesEndRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [numberOfSentences]) // Scroll when messages array updates

  return (
    <>
      <Header />
      <div className="px-4 md:px-40 max-w-[1024px] pt-16 h-[calc(100vh-180px)] overflow-auto">
        {Object.values(data)
          .slice(0, numberOfSentences)
          .map((item, index) => (
            <Card
              key={`${item.definition}-${index}`}
              id={index + 1}
              sentence={data[index + 1].definition}
              translation={data[index + 1].letter}
            />
          ))}
        <div ref={messagesEndRef} className="h-[300px]" />
      </div>
      <div className="fixed bottom-0 h-24 bg-white flex justify-center items-center w-full">
        <div
          onClick={handleNext}
          className="text-center w-[500px] p-4 rounded-full max-w-96 bg-[#FEE1FF] text-[#EB42EE] font-extrabold tracking-wide"
        >
          NEXT
        </div>
      </div>
    </>
  )
}
