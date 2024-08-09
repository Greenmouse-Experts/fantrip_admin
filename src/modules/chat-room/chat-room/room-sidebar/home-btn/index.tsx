import { GoHomeFill } from "react-icons/go"
import { useChat } from "../../../../../hooks/useChat";

const HomeButton = () => {
  const { community, saveCommunity } = useChat();
  return (
    <div className="">
      <button
        type="button"
        onClick={() =>
          saveCommunity({
            name: 'all',
            activeId: 'all',
          })
        }
        className={`rounded-[15px] flex gap-x-4 items-center py-2 w-full ${community.activeId === 'all'? 'bg-[#EDEDFF] dark:bg-[#131313] px-5' : ''}`}
      >
        <GoHomeFill className="text-[#9847FE] lg:text-xl" />
        <p className="fw-500">Home</p>
      </button>
    </div>
  );
}

export default HomeButton