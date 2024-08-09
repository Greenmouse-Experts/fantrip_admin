import { FC, useEffect, useState } from "react";
import ChatListHistory from "./components/chat-list";
import { ChatItem } from "../../../../contracts/chat";
import useAuth from "../../../../hooks/authUser";
import { FaListUl } from "react-icons/fa6";
import useDialog from "../../../../hooks/useDialog";
import AllUsersList from "./all-users-modal";

interface Props {
  socket: any;
}
const RoomChatListIndex: FC<Props> = ({ socket }) => {
  const {Dialog, setShowModal} = useDialog()
  const [prevChats, setPrevChats] = useState<ChatItem[]>([]);
  const { token, userId } = useAuth();

  const getMessages = () => {
    const onListenEvent = (value: any) => {
      setPrevChats(value.data.result);
    };
    socket.on(`chatsRetrieved:${userId}`, onListenEvent);

    // Remove event listener on component unmount
    return () => socket.off("chatroom_listen");
  };
  useEffect(() => {
    const payload = {
      token: token,
      page: 1,
    };
    socket.emit("retrieveChats", payload);
  }, []);

  useEffect(() => {
    getMessages();
  }, [socket]);

  return (
    <div className="h-full">
      <div className="bg-[#EDEDFF] dark:bg-[#131313] rounded-[12px] p-4 mt-4 h-full">
        <div className="flex justify-between items-center">
          <p className="lg:text-xl fw-500">Messages</p>
          <FaListUl
              className="cursor-pointer text-primary"
              onClick={() => setShowModal(true)}
            />
        </div>
        <div>
          <ChatListHistory prevChats={prevChats} />
        </div>
      </div>
      <Dialog title="All Users" size="sm">
        <AllUsersList close={() => setShowModal(false)}/>
      </Dialog>
    </div>
  );
};

export default RoomChatListIndex;
