import React, { FC } from "react";
import { RESERVATION_STATUS } from "../../../contracts/enums";
import { Menu, Button, MenuHandler, MenuItem, MenuList } from "@material-tailwind/react";
import { formatStatus } from "../../../utils/formatHelp";
import { FetchParam } from "../../../contracts/routine";
import { FaChevronDown } from "react-icons/fa6";

interface Props {
  setParams: React.Dispatch<React.SetStateAction<any>>;
  param: FetchParam;
}
const BookingFilter: FC<Props> = ({ setParams, param }) => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="border dark:border-gray-700 px-4 py-3  rounded-lg">
        <Menu>
          <MenuHandler>
            <Button className="call-btn">
            <div className="flex text-black dark:text-white gap-x-2 items-center">
                <p>Status:</p>
                {formatStatus[param.status as keyof typeof formatStatus]}
                <FaChevronDown className="relative bottom-[1px] ml-2"/>
              </div>
            </Button>
          </MenuHandler>
          <MenuList>
          <MenuItem
                onClick={() =>
                  setParams({
                    ...param,
                    status: RESERVATION_STATUS.PENDING,
                  })
                }
              >
                <p className="text-black">Pending Reservations</p>
              </MenuItem>
              <MenuItem
                onClick={() =>
                  setParams({
                    ...param,
                    status: RESERVATION_STATUS.CONFIRMED,
                  })
                }
              >
                <p className="text-black">Confirmed Reservations</p>
              </MenuItem>
              <MenuItem
                onClick={() =>
                  setParams({
                    ...param,
                    status: RESERVATION_STATUS.CANCELLED,
                  })
                }
              >
                <p className="text-black">Cancelled Reservations</p>
              </MenuItem>
          </MenuList>
        </Menu>
        </div>
      </div>
    </div>
  );
};

export default BookingFilter;
