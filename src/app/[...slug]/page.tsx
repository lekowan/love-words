import { getStory } from "@/data/story"
import { StoryTemplate } from "../components/story-template/story-template"
import type { Dictionary } from "../hooks/useDictionaryStore"

export interface TranscriptDataEntry {
  audio?: string
  character: string
  characterWithSpace?: string
  katakana?: string
  definition: string
  katakanaWithSpace?: string
  speaker?: "Penguin" | "Polar Bear" | "Panda" | "Sasako" | "Handa" | "Other"
}

export interface TranscriptDataProps {
  [key: number]: TranscriptDataEntry
}

export async function generateStaticParams() {
  const storyListData = await getStory("story-list")
  return storyListData.map((story: { slug: string }) => story.slug)
}

export default async function Story({ params }: { params: { slug: string } }) {
  const storyData: TranscriptDataProps = await getStory(params.slug)
  const dictionary: Dictionary = await getStory(
    `/dictionary/${params.slug}-dictionary`
  )
  return <StoryTemplate data={storyData} dictionary={dictionary} />
}
