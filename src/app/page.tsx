import { getStory } from "@/data/story/story"
import Link from "next/link"

export default async function Home() {
  const storyListData = await getStory("story-list")

  interface StoryEntry {
    slug: string
    title: string
  }

  return (
    <ul>
      {storyListData.map(({ slug, title }: StoryEntry) => (
        <Link href={slug}>
          <p key={title}>{title}</p>
        </Link>
      ))}
    </ul>
  )
}
