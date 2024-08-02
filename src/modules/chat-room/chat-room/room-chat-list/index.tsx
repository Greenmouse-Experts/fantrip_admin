import { FC, useEffect, useState } from "react";
import ChatListHistory from "./components/chat-list";
import { ChatItem } from "../../../../contracts/chat";
import useAuth from "../../../../hooks/authUser";

interface Props {
  socket: any;
}
const RoomChatListIndex: FC<Props> = ({ socket }) => {
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
        <div>
          <p className="lg:text-xl fw-500">Messages</p>
        </div>
        <div>
          <ChatListHistory prevChats={prevChats} />
        </div>
      </div>
    </div>
  );
};

export default RoomChatListIndex;
