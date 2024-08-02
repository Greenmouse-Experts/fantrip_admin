import { BsFillBarChartLineFill } from "react-icons/bs";
import { FaFile } from "react-icons/fa6";
import { GoChevronRight } from "react-icons/go";
import { MdQuiz } from "react-icons/md";

const ActionLists = () => {
  return (
    <div>
      <ul className="grid gap-6">
        <li className="flex cursor-pointer lg:pr-2 justify-between items-center">
          <p className="flex items-center  gap-x-4">
            <BsFillBarChartLineFill className="text-lg lg:text-xl"/>
            <span>Create Poll</span>
          </p>
          <GoChevronRight className="text-[#8C8C8C]" />
        </li>
        <li className="flex cursor-pointer lg:pr-2 justify-between items-center">
          <p className="flex items-center  gap-x-4">
            <MdQuiz className="text-lg lg:text-xl"/>
            <span>Game Quiz</span>
          </p>
          <GoChevronRight className="text-[#8C8C8C]" />
        </li>
        <li className="flex cursor-pointer lg:pr-2 justify-between items-center">
          <p className="flex items-center  gap-x-4">
            <FaFile className="text-lg lg:text-xl"/>
            <span>Guidelines</span>
          </p>
          <GoChevronRight className="text-[#8C8C8C]" />
        </li>
      </ul>
    </div>
  );
};

export default ActionLists;
