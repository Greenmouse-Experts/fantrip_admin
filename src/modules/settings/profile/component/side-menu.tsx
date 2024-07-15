import React, { FC } from "react";
import { BsGear } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";

interface Props {
  active: number;
  setActive: React.Dispatch<React.SetStateAction<number>>;
}
const SettingSideMenu: FC<Props> = ({ setActive, active }) => {
  return (
    <div>
      <div className="mt-6 flex gap-x-4">
        <div
          className={`px-4 cursor-pointer rounded-[10px] py-3 flex gap-x-3 justify-between items-center hover:border hover:border-[#9847FE] ${
            active === 1 && "border border-[#9847FE] text-[#9847FE]"
          }`}
          onClick={() => setActive(1)}
        >
          <p>Account</p>
          <FaUserCircle className="text-xl" />
        </div>
        <div
          className={`px-4 cursor-pointer rounded-[10px] py-3 gap-x-3 flex justify-between items-center hover:border hover:border-[#9847FE] ${
            active === 2 && "border border-[#9847FE] text-[#9847FE]"
          }`}
          onClick={() => setActive(2)}
        >
          <p>Security</p>
          <BsGear className="text-xl" />
        </div>
      </div>
    </div>
  );
};

export default SettingSideMenu;
