
import { FC } from "react";
import { ChatItem, UserChatItem } from "../../../../../contracts/chat";
import useAuth from "../../../../../hooks/authUser";
import { useChat } from "../../../../../hooks/useChat";
import { useUtils } from "../../../../../hooks/useUtils";
import { formatName } from "../../../../../utils/formatHelp";

interface Props {
  prevChats: ChatItem[];
}
const ChatListHistory: FC<Props> = ({ prevChats }) => {
  const { userId } = useAuth();
  const { saveGuestInfo } = useChat();
  const { toggleStayChatmodal: setShowModal } = useUtils();

  const openChatWithUser = (item: ChatItem) => {
    let receiver = {} as UserChatItem;
    if (item?.chatBuddy.id === userId) {
      receiver = item.initiator;
    } else {
      receiver = item.chatBuddy;
    }
    const payload = {
      id: receiver.id,
      firstName: receiver.firstName,
      lastName: receiver.lastName,
      nickname: receiver.nickname,
      verifiedAsHost: receiver.verifiedAsHost,
      role: receiver.role,
      picture: receiver.picture,
    };
    saveGuestInfo(payload, '');
    setShowModal(true);
  };

  return (
    <div className="mt-4">
      <ul className="grid gap-3 lg:gap-5">
        {prevChats.map((item, i) => (
          <li
            className="flex gap-x-1 items-center cursor-pointer"
            key={i}
            onClick={() => openChatWithUser(item)}
          >
            <img
              src={
                (item.chatBuddy.picture) ||
                "https://res.cloudinary.com/greenmouse-tech/image/upload/v1721902661/fantrip/avatars_cyhkdy.webp"
              }
              alt=""
              className="w-8 h-8 circle shrink-0 object-cover"
            />
            <div>
              <p className="fs-500 fw-500 leading-none">
                {`${item.chatBuddy.firstName} ${item.chatBuddy.lastName}`}
              </p>
              <p className="opacity-70 text-[12px]">
                {formatName(item.lastMessage, 25)}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatListHistory;
