import { TranscriptDataProps } from "@/app/page"
import { IconBar } from "../icon-bar"
import { Popover } from "../popover/popover"

export interface DataProps {
  id: number
  setData: React.Dispatch<React.SetStateAction<TranscriptDataProps>>
  data: TranscriptDataProps
}

export const Card = ({ id, setData, data }: DataProps) => {
  return (
    <div className="my-6">
      {<p className="h-6">{data[id].translate === true && data[id].letter}</p>}
      <Popover sentence={data[id].definition} />
      <IconBar id={id} setData={setData} data={data} className="mt-2" />
    </div>
  )
}
