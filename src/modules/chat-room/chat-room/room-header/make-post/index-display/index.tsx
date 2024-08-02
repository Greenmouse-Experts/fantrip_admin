import { IoImageOutline, IoVideocamOutline } from "react-icons/io5";
import useAuth from "../../../../../../hooks/authUser";

const IndexDisplayUi = () => {
  const { user } = useAuth();
  return (
    <div>
      <div className="border border-[#D2D2D2] flex items-center justify-between cursor-pointer p-[2px] pl-1 pr-5 rounded-full">
        <div className="flex gap-x-6 items-center">
          <div className="w-[32px] h-[32px] bg-gradient p-[1px] circle">
            <img
              src={
                user.image ||
                "https://res.cloudinary.com/greenmouse-tech/image/upload/v1721902661/fantrip/avatars_cyhkdy.webp"
              }
              alt="profile"
              className="w-full h-full circle object-cover"
            />
          </div>
          <p className="fw-500">Make a Post!!</p>
        </div>
        <div className="flex gap-x-3">
          <IoImageOutline className="text-[#8C8C8C] text-lg" />
          <IoVideocamOutline className="text-[#8C8C8C] text-lg" />
        </div>
      </div>
    </div>
  );
};

export default IndexDisplayUi;
