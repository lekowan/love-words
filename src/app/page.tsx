"use client"

import { useEffect } from "react"
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

  useEffect(() => console.log(clickedWord))

  return (
    <>
      <Header />
      <div className="flex">
        <div className="px-4 md:px-40 max-w-[1024px] pt-16">
          {Object.values(data).map((item, index) => (
            <Card
              key={`${item.definition}-${index}`}
              id={index + 1}
              sentence={data[index + 1].definition}
              translation={data[index + 1].letter}
            />
          ))}
        </div>
      </div>
    </>
  )
}
