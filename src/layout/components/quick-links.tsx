import { useState } from "react";

const QuickLinks = () => {
  const [active, setActive] = useState(1);
  return (
    <div className="">
      <div>
        <ul className="flex gap-x-4">
          <li
            onClick={() => setActive(1)}
            className={`fs-500 cursor-pointer ${active === 1 ? "text-[#1C1C1C66]" : "text-[#1C1C1C33]"}`}
          >
            Favorites
          </li>
          <li
            onClick={() => setActive(2)}
            className={`fs-500 cursor-pointer ${active === 2 ? "text-[#1C1C1C66]" : "text-[#1C1C1C33]"}`}
          >
            Recently
          </li>
        </ul>
      </div>
      <div className="mt-3 px-2">
        {active === 1 && (
          <div>
            <ul className="grid gap-4">
              <li className="flex items-center cursor-pointer gap-x-2">
                <span className="w-2 h-2 circle bg-[#1C1C1C33]"></span>
                <span className="text-[14px] text-[#1C1C1C]">Overview</span>
              </li>
              <li className="flex items-center cursor-pointer gap-x-2">
                <span className="w-2 h-2 circle bg-[#1C1C1C33]"></span>
                <span className="text-[14px] text-[#1C1C1C]">Users</span>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuickLinks;
