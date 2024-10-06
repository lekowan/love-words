import Image from "next/image"
import Panda from "../../../assets/panda.png"
import PolarBear from "../../../assets/shirokuma.png"
import Penguin from "../../../assets/penguin.png"

export const Avatar = ({ speaker }: { speaker?: string }) => {
  return (
    <div className="tw-w-12 tw-h-12 tw-rounded-full">
      {speaker === "Panda" && (
        <Image src={Panda} width={48} height={48} alt="Panda" />
      )}
      {speaker === "Penguin" && (
        <Image src={Penguin} width={48} height={48} alt="Penguin" />
      )}
      {speaker === "Polar Bear" && (
        <Image src={PolarBear} width={48} height={48} alt="Polar Bear" />
      )}
    </div>
  )
}
