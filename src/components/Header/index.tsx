import useBootstrap from "@/hooks/useBootstrap";
import Loading from "../Loading";
import useUser from "@/hooks/useUser";

export default function Header() {
  const loading = useBootstrap();
  const { user } = useUser();

  return (
    <>
      <header
        className="bg-gray-600"
      >
        <div className="max-w-[600px] w-full flex gap-4 bg-gray-600 p-4 items-center mx-auto">
          <div className="uppercase flex gap-0 flex-col">
            <span className="font-bold truncate">{user.username}</span>
          </div>
        </div>
      </header>
      {loading && <Loading />}
    </>
  )
}