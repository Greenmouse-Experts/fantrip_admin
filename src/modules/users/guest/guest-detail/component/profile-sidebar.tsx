import { FaQuoteRight } from "react-icons/fa6";
import ProfileAvatar from "../../../../../components/ProfileAvatar";
import { RiExchange2Line } from "react-icons/ri";
import SocialLinks from "./social-links";
import { FC } from "react";
import { UserItem } from "../../../../../contracts/users";
import { formatPhoneNumber, formatStatus } from "../../../../../utils/formatHelp";

interface Props{
  data: UserItem
}
const ProfileSidebar:FC<Props> = ({data}) => {
  return (
    <div>
      <div className="flex justify-center">
        <ProfileAvatar
          url={data.picture || "https://res.cloudinary.com/greenmouse-tech/image/upload/v1712921717/fantrip/Ellipse_56_frahhh.png"}
          name="Ade Tole"
          size={150}
          font={23}
        />
      </div>
      <div className="mt-4 text-center">
        <p className="text-lg lg:text-xl fw-600 syne">{`${data.firstName} ${data.lastName}`}</p>
        <p className="text-gradient capitalize fw-600">{data.role}</p>
        <div className="flex mt-2 gap-x-2 items-center fw-500 syne justify-center text-green-600">
          {
            data.isSuspended? formatStatus['inactive'] : formatStatus['active']
          }
          <RiExchange2Line className="text-red-600 cursor-pointer" />
        </div>
      </div>
      <div className="mt-5 text-center">
        <FaQuoteRight className="text-4xl text-[#FC819F] mx-auto" />
        <p className="fs-500 syne lg:px-2 italic opacity-60">
          {data?.bio}
        </p>
      </div>
      <div className="mt-6">
        <div className="bg-[#fbdfe7] dark:bg-[#1d1d1d] grid gap-3 p-2 lg:p-3 fs-500 drop-shadow-md rounded-lg">
          <div className="">
            <p>Email:</p>
            <p className="opacity-60">{data.email}</p>
          </div>
          <div className="">
            <p>Phone:</p>
            <p className="opacity-60">{formatPhoneNumber(data.phone)}</p>
          </div>
          <div className="">
            <p>State:</p>
            <p className="opacity-60">{data.state}</p>
          </div>
          <div className="">
            <p>Country:</p>
            <p className="opacity-60">{data.country}</p>
          </div>
          <div>
            <SocialLinks insta={data.instagramUrl} fb={data.facebookUrl} link={data.linkedinUrl} tweet={data.twitterUrl}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSidebar;
