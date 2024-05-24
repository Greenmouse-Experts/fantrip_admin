import { FC } from "react";
import GradientLine from "./GradientLine";
import { MdAddCircle } from "react-icons/md";

interface Props {
  name: string;
  btnName?: string;
  btnAction?: () => void;
}
const PagesHeader: FC<Props> = ({ name, btnAction, btnName }) => {
  return (
    <div>
      <div className="flex justify-between items-center p-2 bg-gray-50 dark:bg-[#131313]">
        <p className="text-xl">{name}</p>
        {btnName && (
          <div
            className="flex items-center cursor-pointer gap-x-2"
            onClick={btnAction}
          >
            <MdAddCircle />
            <p>{btnName}</p>
          </div>
        )}
      </div>
      <GradientLine />
    </div>
  );
};

export default PagesHeader;
