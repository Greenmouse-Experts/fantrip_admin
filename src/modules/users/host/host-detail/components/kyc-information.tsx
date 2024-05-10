import {
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { Link } from "react-router-dom";

const HostKycInformation = () => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <p className="text-xl fw-500">Host Information</p>
        <Menu>
          <MenuHandler>
            <Button className="call-btn">
              <div className="flex gap-x-2 items-center fw-500 !syne justify-center text-orange-600">
                <span className="w-3 h-3 circle bg-orange-600 block"></span>
                <p className="fw-600">Not Verified</p>
              </div>
            </Button>
          </MenuHandler>
          <MenuList>
            <MenuItem className="flex gap-x-2 items-center"><RiVerifiedBadgeFill className="text-lg"/>Verify Host</MenuItem>
          </MenuList>
        </Menu>
      </div>
      <div className="mt-5 grid gap-3 fs-500">
        <div className="flex gap-x-2">
          <p>Fullname:</p>
          <p className="opacity-60">Winsconsin Adebayo</p>
        </div>
        <div className="flex gap-x-2">
          <p>Bio:</p>
          <p className="opacity-60">
            You only live once so live to the fullest and enjoy every minute.
          </p>
        </div>
        <div className="flex gap-x-2">
          <p>Facebook:</p>
          <Link className="text-primary" to={""}>
            https://fb.com/adebayo
          </Link>
        </div>
        <div className="flex gap-x-2">
          <p>Twitter:</p>
          <Link className="text-primary" to={""}>
            https://x.com/adebayo
          </Link>
        </div>
        <div className="flex gap-x-2">
          <p>LinkedIn:</p>
          <Link className="text-primary" to={""}>
            https://linkedin.com/adebayo
          </Link>
        </div>
        <div className="flex gap-x-2">
          <p>Instagram:</p>
          <Link className="text-primary" to={""}></Link>
        </div>
        <div className="flex gap-x-2">
          <p>Government Id:</p>
          <Link className="text-primary" to={""}></Link>
        </div>
      </div>
    </div>
  );
};

export default HostKycInformation;
