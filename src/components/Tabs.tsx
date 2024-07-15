import { FC, useState } from "react";
import { classNames } from "../utils/formatHelp";

interface Props {
  tabs: {
    title: JSX.Element;
    content: JSX.Element;
  }[];
  broadcastCurrentIndex?: (index: number) => void;
  type: string;
}

const Tabs: FC<Props> = ({ tabs, broadcastCurrentIndex, type }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navStyle = {
    charts:
      "bg-light dark:bg-[#272727] p-4 rounded-[10px] flex lg:space-x-2 space-x-2 overflow-x-auto",
    norm: "flex lg:space-x-4 space-x-2 overflow-x-auto",
    "": "-mb-px border-b tab-bar flex lg:space-x-2 space-x-2 overflow-x-auto",
  };
  const navClass = {
    charts:
      "whitespace-nowrap grow text-center cursor-pointer py-[10px] fs-500",
    norm: "whitespace-nowrap text-center cursor-pointer py-[5px] px-6 fs-500",
    "": "px-5 cursor-pointer",
  };
  const navActiveClass = {
    charts: "bg-gradient text-white fw-600 rounded-[10px] duration-100",
    norm: "border-b-[4px] text-[#052b5e] border-[#052b5e]",
    "": "border-b-[4px] text-[#052b5e] cursor-pointer fw-600 border-[#052b5e] px-5",
  };
  const navInactiveClass = {
    charts: "text-[#A6A6A6] bg-[#FAFAFA] dark:bg-[#131313] hover:text-gray-700",
    norm: "text-[#A6A6A6] border-b-[4px] border-[#FAFAFA] hover:text-gray-700",
  };

  return (
    <div>
      <div className="">
        <div className="">
          <nav
            className={navStyle[type as keyof typeof navStyle]}
            aria-label="Tabs"
          >
            {tabs.map((tab, index) => (
              <div
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  broadcastCurrentIndex && broadcastCurrentIndex(index);
                }}
                className={classNames(
                  index === currentIndex
                    ? navActiveClass[type as keyof typeof navActiveClass]
                    : navInactiveClass[type as keyof typeof navInactiveClass],
                  navClass[type as keyof typeof navClass]
                )}
              >
                {tab.title}
              </div>
            ))}
          </nav>
          <div className="pt-2">{tabs[currentIndex].content}</div>
        </div>
      </div>
    </div>
  );
};

export default Tabs;