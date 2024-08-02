import {
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import { BsThreeDotsVertical } from "react-icons/bs";

const ProfileMore = () => {
  return (
    <div>
      <Menu>
        <MenuHandler>
          <div className="flex gap-x-2 items-center">
            <BsThreeDotsVertical size={19} className="text-2xl" />
          </div>
        </MenuHandler>
        <MenuList className="text-black !w-[200px]">
          <MenuItem>
            <p className="text-black fs-400">Start Chat</p>
          </MenuItem>
          <MenuItem>
            <p className="text-black fs-400">View User Profile</p>
          </MenuItem>
          <MenuItem>
            <p className="text-black fs-400">Report this user</p>
          </MenuItem>
        </MenuList>
      </Menu>
    </div>
  );
};

export default ProfileMore;
