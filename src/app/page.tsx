"use client"

import { useState } from "react"
import { transcriptData } from "../data/shirokuma-ep5"
import { Card } from "./components/card"
import { Header } from "./components/header"

interface TranscriptDataEntry {
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
  const [data, setData] = useState<TranscriptDataProps>(transcriptData)

  return (
    <>
      <Header />
      <div className="flex">
        <div className="px-4 md:px-40 max-w-[1024px] pt-16">
          {Object.values(data).map((item, index) => (
            <Card
              key={`${item.definition}-${index}`}
              id={index + 1}
              setData={setData}
              data={data}
            />
          ))}
        </div>
      </div>
    </>
  )
}
