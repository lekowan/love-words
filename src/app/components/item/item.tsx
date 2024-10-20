export const Item = ({ title }: { title: string }) => {
  return (
    <>
      <div className="tw-flex tw-flex-nowrap tw-p-4">
        <div className="thumbnail tw-w-14 tw-h-14"></div>
        <div className="tw-p-4">{title}</div>
      </div>
    </>
  )
}
