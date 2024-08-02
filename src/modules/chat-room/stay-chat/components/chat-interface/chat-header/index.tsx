import { useChat } from "@/hooks/useChat";
import { FC } from "react";
import { FaTimes } from "react-icons/fa";

interface Props{
    close: () => void
}
const ChatHeader:FC<Props> = ({close}) => {
   const { hostInfo } = useChat();
  return (
    <div className="bg-gradient px-4 py-2 text-white">
      <div className="flex justify-between items-center">
        <div className="flex gap-x-2 items-center">
          <img
            src={hostInfo.picture || "https://res.cloudinary.com/greenmouse-tech/image/upload/v1721902661/fantrip/avatars_cyhkdy.webp"}
            alt="profile"
            className="w-12 h-12 object-cover circle"
          />
          <p className="fw-600 lg:text-lg">{`${hostInfo.firstName} ${hostInfo.lastName}`}</p>
        </div>
        <div className="relative z-20 cursor-pointer">
          <FaTimes className="text-xl" onClick={close}/>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
