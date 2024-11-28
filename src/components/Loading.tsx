import { Spinner } from "@cagen/ezsite-components";

export default function Loading() {
  return (
    <div className="h-full w-full fixed top-0 left-0 bg-black flex flex-col gap-4 justify-center items-center z-50">
      <Spinner />
    </div>
  )
}