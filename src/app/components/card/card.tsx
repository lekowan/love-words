"use client"

import { useEffect, useState } from "react"
import { IconBar } from "../icon-bar"

interface DataProps {
  character: string
  translation: string
  id: number
  setData: any
  data: any
  translate?: boolean
}

export const Card = ({ id, setData, data }: DataProps) => {
  useEffect(() => console.log(data[id]), [data])

  return (
    <div className="my-6">
      {<p className="h-6">{data[id].translate === true && data[id].letter}</p>}

      <p className="text-2xl">{data[id].character}</p>
      <IconBar id={id} setData={setData} data={data} />
    </div>
  )
}
