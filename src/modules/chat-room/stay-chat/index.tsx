import { BsChatDots } from "react-icons/bs";
import { FC } from "react";
import { UserItem } from "../../../contracts/users";
import { useUtils } from "../../../hooks/useUtils";
import { useChat } from "../../../hooks/useChat";

interface Props {
  id: string;
  host: UserItem;
}
const ChatForStay: FC<Props> = ({ host }) => {
  const { saveGuestInfo} = useChat();
  const { toggleStayChatmodal: setShowModal } = useUtils();
  const openChatWitUser = () => {
    const payload = {
      id: host.id,
      firstName: host.firstName,
      lastName: host.lastName,
      nickname: host.nickname,
      verifiedAsHost: host.verifiedAsHost,
      role: host.role,
      picture: host.picture,
    };
    saveGuestInfo(payload, "");
    setShowModal(true);
  };
  return (
    <div>
      <button
        onClick={() => openChatWitUser()}
        className="flex gap-x-2 fs-400 md:fs-600 items-center fw-500"
      >
        <BsChatDots />
        Chat with Host
      </button>
    </div>
  );
};

export default ChatForStay;
