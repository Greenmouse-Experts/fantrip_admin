import { FiSearch } from "react-icons/fi";

const SearchInput = () => {
  return (
    <div className="w-full flex items-center gap-x-2 bg-[#EFEFEF] dark:bg-[#131313] rounded-full px-2 lg:px-6">
      <FiSearch className="text-xl shrink-0" />
      <input
        type="search"
        placeholder="Search fantrip"
        className="border-none outline-none bg-transparent p-2 w-full"
      />
    </div>
  );
};

export default SearchInput;
