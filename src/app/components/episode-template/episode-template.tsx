"use client"

import { useLocalStorage } from "@/app/hooks/useLocalStorage"
import Link from "next/link"
import { Item } from "../item"
import { useEffect, useState, Suspense } from "react"

interface StoryItemProps {
  slug: string
  title: string
}

export const EpisodeTemplate = ({
  storyListData,
}: {
  storyListData: StoryItemProps[]
}) => {
  return (
    <div>
      {storyListData.map(({ slug, title }: StoryItemProps) => (
        <StoryItem key={slug} slug={slug} title={title} />
      ))}
    </div>
  )
}

function StoryItem({ slug, title }: StoryItemProps) {
  // Call hooks directly in the functional component
  const [progress] = useLocalStorage(`${slug}`, "numberOfLine")
  const [maxNumberOfLines] = useLocalStorage(`${slug}`, "totalNumberOfLines")

  // Ensure the component waits for client-side rendering
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Avoid rendering before the client is ready
  if (!isClient) return null

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Link href={slug} className="episode-list">
        <Item
          title={title}
          progress={progress}
          maxNumberOfLines={maxNumberOfLines}
        />
      </Link>
    </Suspense>
  )
}
