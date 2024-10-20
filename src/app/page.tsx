import { getStory } from "@/data/story/story"
import Link from "next/link"
import { Item } from "./components/item"

export default async function Home() {
  const storyListData = await getStory("story-list")

  interface StoryEntry {
    slug: string
    title: string
  }

  return (
    <div>
      {storyListData.map(({ slug, title }: StoryEntry) => (
        <Link key={title} href={slug} className="episode-list">
          <Item title={title} />
        </Link>
      ))}
    </div>
  )
}
