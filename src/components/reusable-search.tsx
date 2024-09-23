import { FC } from "react";
import { FiSearch } from "react-icons/fi";
import { useDebouncedCallback } from "use-debounce";

interface Props {
  params: string;
  setParams: React.Dispatch<React.SetStateAction<string>>;
}
const ReusableSearchBox: FC<Props> = ({setParams }) => {
  const debounced = useDebouncedCallback((value) => {
    setParams(value);
  }, 1000);
  return (
    <div className="w-full flex items-center gap-x-2 bg-[#EFEFEF] dark:bg-[#131313] rounded-full px-2 lg:px-6">
      <FiSearch className="text-xl shrink-0" />
      <input
        type="search"
        placeholder="Search fantrip users"
        className="border-none outline-none bg-transparent p-2 w-full"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          debounced(e.target.value)
        }
      />
    </div>
  );
};

export default ReusableSearchBox;
