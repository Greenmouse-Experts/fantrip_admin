import { GoHomeFill } from "react-icons/go"

const HomeButton = () => {
  return (
    <div className="">
      <button
        type="button"
        className="bg-[#EDEDFF] dark:bg-[#131313] rounded-[15px] flex gap-x-4 px-5 items-center py-2 w-full"
      >
        <GoHomeFill className="text-[#9847FE] lg:text-xl" />
        <p className="fw-500">Home</p>
      </button>
    </div>
  );
}

export default HomeButton