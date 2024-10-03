"use client"

import { useEffect, useRef, useState } from "react"
import { transcriptData } from "../data/shirokuma-ep3"
import { Card } from "./components/card"
import { Header } from "./components/header"
import { useWordStore } from "./hooks/useWordStore"
import { cn } from "../../utils/cn"

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
  const [currentNumberOfSentences, setCurrentNumberOfSentences] =
    useState<number>(1)
  const totalNumberOfSentences = Object.keys(data).length

  useEffect(() => console.log(clickedWord))

  const handleNext = () => {
    setCurrentNumberOfSentences((value) => value + 1)
  }

  const messagesEndRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [currentNumberOfSentences]) // Scroll when messages array updates

  return (
    <>
      <Header
        progressStart={currentNumberOfSentences}
        progressEnd={totalNumberOfSentences}
        className={cn("tw-fixed tw-z-10")}
      />
      <div className="tw-px-4 md:tw-px-40 tw-max-w-[1024px] tw-pt-16 tw-h-[calc(100vh-180px)]">
        {Object.values(data)
          .slice(0, currentNumberOfSentences)
          .map((item, index) => (
            <Card
              key={`${item.definition}-${index}`}
              id={index + 1}
              sentence={data[index + 1].definition}
              translation={data[index + 1].letter}
            />
          ))}
        <div ref={messagesEndRef} className="tw-h-[300px]" />
      </div>
      <div className="tw-fixed tw-bottom-0 tw-h-24 tw-bg-white tw-flex tw-justify-center tw-items-center tw-w-full">
        <div
          onClick={handleNext}
          className="tw-text-center tw-w-[500px] tw-py-3 tw-px-6 tw-tracking-[2px] tw-rounded-full tw-max-w-96 tw-bg-[#FEE1FF] tw-text-[#EB42EE] tw-font-extrabold tw-cursor-pointer"
        >
          Continue
        </div>
      </div>
    </>
  )
}
