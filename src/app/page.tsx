import { getStory } from "@/data/story"
import { EpisodeTemplate } from "./components/episode-template/episode-template"

export default async function Home() {
  const storyListData = await getStory("story-list")

  return <EpisodeTemplate storyListData={storyListData} />
}
