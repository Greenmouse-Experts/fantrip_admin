import { FaQuoteRight } from "react-icons/fa6";
import ProfileAvatar from "../../../../../components/ProfileAvatar";
import { RiExchange2Line } from "react-icons/ri";
import { HostDetailItem } from "../../../../../contracts/users";
import { FC } from "react";
import {
  formatPhoneNumber,
} from "../../../../../utils/formatHelp";
import SuspendUser from "../../../user-action/suspend-user";

interface Props {
  user: HostDetailItem;
}
const ProfileSidebar: FC<Props> = ({ user }) => {
  const {
    firstName,
    lastName,
    bio,
    email,
    phone,
    picture,
    isSuspended,
    state,
    country,
    id
  } = user;
  return (
    <div>
      <div className="flex justify-center">
        <ProfileAvatar
          url={
            picture ||
            "https://res.cloudinary.com/greenmouse-tech/image/upload/v1712921717/fantrip/Ellipse_56_frahhh.png"
          }
          name={`${firstName} ${lastName}`}
          size={150}
          font={23}
        />
      </div>
      <div className="mt-4 text-center">
        <p className="text-lg lg:text-xl fw-600 syne">{`${firstName} ${lastName}`}</p>
        <p className="text-gradient fw-600">Host</p>
        <div className="flex mt-2 gap-x-2 items-center fw-500 syne justify-center text-green-600">
          {/* {isSuspended ? formatStatus["inactive"] : formatStatus["active"]}
           */}
          <SuspendUser id={id} status={isSuspended} /><RiExchange2Line className="text-red-600 cursor-pointer" />
        </div>
      </div>
      <div className="mt-5 text-center">
        <FaQuoteRight className="text-4xl text-[#FC819F] mx-auto" />
        <p className="fs-500 syne lg:px-2 italic opacity-60">{bio}</p>
      </div>
      <div className="mt-6">
        <div className="bg-[#fbdfe7] dark:bg-[#1d1d1d] grid gap-3 p-2 lg:p-3 fs-500 drop-shadow-md rounded-lg">
          <div className="">
            <p>Email:</p>
            <p className="w-full opacity-60 overflow-x-auto scroll-pro">{email}</p>
          </div>
          <div className="">
            <p>Phone:</p>
            <p className="opacity-60">{formatPhoneNumber(phone)}</p>
          </div>
          <div className="">
            <p>State:</p>
            <p className="opacity-60">{state}</p>
          </div>
          <div className="">
            <p>Country:</p>
            <p className="opacity-60">{country}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSidebar;
