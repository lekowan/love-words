export const Header = () => {
  return (
    <div className="min-h-16 flex items-center justify-between py-0 px-5 fixed w-full bg-[#212121]">
      <div className="font-extrabold">Shirokuma Cafe ep.3</div>
      <div className="pt-2 cursor-pointer">
        <svg
          xmlns="https://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 0 24 24"
          width="24px"
          fill="#2a2142"
        >
          <path d="M0 0h24v24H0V0z" fill="none"></path>
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"></path>
        </svg>
      </div>
    </div>
  )
}
