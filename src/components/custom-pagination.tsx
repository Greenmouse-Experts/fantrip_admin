import { FC } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { getPageCount } from "../utils/formatHelp";

interface Props {
  count: number;
  page: number;
  next: () => void;
  prev: () => void;
  limit: number;
  name: string;
}
const CustomPagination: FC<Props> = ({
  count,
  limit,
  page,
  next,
  prev,
  name,
}) => {
  const pageCount = getPageCount(count || 0, limit || 0);
  return (
    <div className="flex items-center gap-x-3">
      <div>
        {(page -1) * limit} - {limit * (page)} of {count} {name}
      </div>
      <div className="flex border-l-2 pl-3 items-center gap-x-2">
        <div className="">
          page {page} of {pageCount}
        </div>
        <div className="flex items-center gap-x-2">
          <FaArrowLeft className="cursor-pointer" onClick={prev} />
          <FaArrowRight className="cursor-pointer" onClick={next} />
        </div>
      </div>
    </div>
  );
};

export default CustomPagination;
