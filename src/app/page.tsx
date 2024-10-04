"use client"

import { useEffect, useRef, useState } from "react"
import { transcriptData } from "../data/shirokuma-ep3"
import { Header, CardList, CardListControls } from "./components/"
import { cn } from "../../utils/cn"
import { useLocalStorage } from "./hooks/useLocalStorage"

export interface TranscriptDataEntry {
  character: string
  letter: string
  pinyin: string
  definition: string
  pinyinSpace: string
  translate?: boolean
  speaker?: "Penguin" | "Polar Bear" | "Panda" | "Sasako" | "Handa" | "Other"
}

export interface TranscriptDataProps {
  [key: number]: TranscriptDataEntry
}

export default function Home() {
  const data: TranscriptDataProps = transcriptData
  // const clickedWord = useWordStore((state) => state.clickedWord)

  const [savedNumberOfLines, _] = useLocalStorage("numberOfLine", 1)
  const [currentNumberOfLines, setCurrentNumberOfLines] =
    useState<number>(savedNumberOfLines)
  const totalNumberOfLines = Object.keys(data).length
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [currentNumberOfLines]) // Scroll when messages array updates

  return (
    <>
      <Header
        progressStart={currentNumberOfLines}
        progressEnd={totalNumberOfLines}
        className={cn("tw-fixed tw-z-10")}
      />
      <CardList
        data={data}
        currentNumberOfLines={currentNumberOfLines}
        messageEndRef={messagesEndRef}
      />
      <CardListControls
        data={data}
        setCurrentNumberOfLines={setCurrentNumberOfLines}
        currentNumberOfLines={currentNumberOfLines}
      />
    </>
  )
}
