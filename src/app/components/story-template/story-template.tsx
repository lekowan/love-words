"use client"

import { useEffect, useRef, useState } from "react"
import { CardList, CardListControls, Header } from ".."
import { TranscriptDataProps } from "@/app/[...slug]/page"
import { cn } from "../../../../utils/cn"
import { Dictionary, useDictionaryStore } from "@/app/hooks/useDictionaryStore"

interface StoryTemplateProps {
  data: TranscriptDataProps
  dictionary: Dictionary
}

export const StoryTemplate = ({ data, dictionary }: StoryTemplateProps) => {
  const [currentNumberOfLines, setCurrentNumberOfLines] = useState<number>(1)
  const totalNumberOfLines = Object.keys(data).length
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [showTranslate, setShowTranslate] = useState<boolean>(true)

  const setDictionaryData = useDictionaryStore((state) => state.setData)

  useEffect(() => {
    const storedData = localStorage.getItem("numberOfLine")
    if (storedData) {
      setCurrentNumberOfLines(JSON.parse(storedData))
    }
  }, [])

  useEffect(() => {
    setDictionaryData(dictionary)
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [currentNumberOfLines, dictionary, setDictionaryData])
  return (
    <>
      <Header
        progressStart={currentNumberOfLines}
        progressEnd={totalNumberOfLines}
        className={cn("tw-fixed tw-z-10")}
      />
      <CardList
        showTranslate={showTranslate}
        data={data}
        currentNumberOfLines={currentNumberOfLines}
        messageEndRef={messagesEndRef}
      />
      <CardListControls
        showTranslate={showTranslate}
        setShowTranslate={setShowTranslate}
        data={data}
        setCurrentNumberOfLines={setCurrentNumberOfLines}
        currentNumberOfLines={currentNumberOfLines}
      />
    </>
  )
}
