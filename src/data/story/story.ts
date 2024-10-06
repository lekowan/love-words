import fsPromises from "fs/promises"
import path from "path"

export const getStory = async (string: string) => {
  const filePath = path.join(process.cwd(), `/src/data/${string}.json`)
  const jsonData = await fsPromises.readFile(filePath, "utf8")
  const objectData = JSON.parse(jsonData)

  return objectData
}
