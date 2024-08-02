// import qr from "@/assets/svg/qr.svg";
import { HiBell } from "react-icons/hi";
import { IoMail } from "react-icons/io5";

const ExternalLinks = () => {
  return (
    <div className="flex justify-end gap-x-4">
      <button
        type="button"
        className="w-[42px] h-[42px] place-center bg-[#EDEDFF] dark:bg-[#131313] circle"
      >
        <IoMail className="text-xl text-[#9847FE]" />
      </button>
      <button
        type="button"
        className="w-[42px] h-[42px] place-center bg-[#EDEDFF] dark:bg-[#131313] circle"
      >
        <HiBell className="text-xl text-[#9847FE]" />
      </button>
    </div>
  );
};

export default ExternalLinks;
