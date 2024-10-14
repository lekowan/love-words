import Image from "next/image"
import Panda from "../../../assets/panda.png"
import PolarBear from "../../../assets/shirokuma.png"
import Penguin from "../../../assets/penguin.png"
import PandaMama from "../../../assets/panda-mama.png"
import RinRin from "../../../assets/rinrin.png"
import Sasako from "../../../assets/sasako.png"

export interface AvatarProps {
  speaker:
    | "Penguin"
    | "Polar Bear"
    | "Panda"
    | "Sasako"
    | "Handa"
    | "Other"
    | "Panda Mama"
}

export const Avatar = ({ speaker }: AvatarProps) => {
  return (
    <div className="tw-w-8 tw-h-8 md:tw-w-12 md:tw-h-12 tw-rounded-full">
      {speaker.toLowerCase() === "other" && (
        <div className="tw-w-12 tw-h-12 tw-bg-black tw-rounded-full" />
      )}
      {speaker.toLowerCase() === "panda" && (
        <Image src={Panda} width={48} height={48} alt="Panda" />
      )}
      {speaker.toLowerCase() === "penguin" && (
        <Image src={Penguin} width={48} height={48} alt="Penguin" />
      )}
      {speaker.toLowerCase() === "polar bear" && (
        <Image src={PolarBear} width={48} height={48} alt="Polar Bear" />
      )}
      {speaker.toLowerCase() === "panda mama" && (
        <Image src={PandaMama} width={48} height={48} alt="Panda Mama" />
      )}
      {speaker.toLowerCase() === "rinrin" && (
        <Image src={RinRin} width={48} height={48} alt="Rin Rin" />
      )}
      {speaker.toLowerCase() === "sasako" && (
        <Image src={Sasako} width={48} height={48} alt="Sasako San" />
      )}
    </div>
  )
}
