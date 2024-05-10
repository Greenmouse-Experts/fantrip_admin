import { FaQuoteRight } from "react-icons/fa6";
import ProfileAvatar from "../../../../../components/ProfileAvatar";
import { RiExchange2Line } from "react-icons/ri";

const ProfileSidebar = () => {
  return (
    <div>
      <div className="flex justify-center">
        <ProfileAvatar
          url="https://res.cloudinary.com/greenmouse-tech/image/upload/v1712921717/fantrip/Ellipse_56_frahhh.png"
          name="Ade Tole"
          size={150}
          font={23}
        />
      </div>
      <div className="mt-4 text-center">
        <p className="text-lg lg:text-xl fw-600 syne">Adetola Olu</p>
        <p className="text-gradient fw-600">Host</p>
        <div className="flex mt-2 gap-x-2 items-center fw-500 syne justify-center text-green-600">
          <span className="w-3 h-3 circle bg-green-600 block"></span>
          <p>Active</p>
          <RiExchange2Line className="text-red-600 cursor-pointer" />
        </div>
      </div>
      <div className="mt-5 text-center">
        <FaQuoteRight className="text-4xl text-[#FC819F] mx-auto" />
        <p className="fs-500 syne lg:px-2 italic opacity-60">
          You only live once so live to the fullest and enjoy every minute
        </p>
      </div>
      <div className="mt-6">
        <div className="bg-[#fbdfe7] grid gap-3 p-2 lg:p-3 fs-500 drop-shadow-md rounded-lg">
          <div className="">
            <p>Email:</p>
            <p className="opacity-60">winscosin@gmail.com</p>
          </div>
          <div className="">
            <p>Phone:</p>
            <p className="opacity-60">+1 (409) 4567 5566</p>
          </div>
          <div className="">
            <p>State:</p>
            <p className="opacity-60">Alaska</p>
          </div>
          <div className="">
            <p>Email:</p>
            <p className="opacity-60">United States</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSidebar;
