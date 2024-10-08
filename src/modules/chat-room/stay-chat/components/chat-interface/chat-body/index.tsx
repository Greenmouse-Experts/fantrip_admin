import { FC, useEffect, useRef, useState } from "react";
import ChatBubble from "./component/chat-bubble";
import useAuth from "../../../../../../hooks/authUser";
import { ChatItem2 } from "../../../../../../contracts/chat";
import { useChat } from "../../../../../../hooks/useChat";

interface Props {
  socket: any;
  refetch: string;
}
const ChatBody: FC<Props> = ({ socket, refetch }) => {
  const {
    guestId,
    chatWithGuest,
    guestInfo,
    chatWithGuestPage,
    saveChatWithGuest,
  } = useChat();
  const { userId, token } = useAuth();
  const [newMsg, setNewMsg] = useState<ChatItem2>();
  const [isLoaded, setIsLoaded] = useState(false);

  // on load get previous messages or message history
  const getMessages = () => {
    
    const onListenEvent = (value: any) => {
      setIsLoaded(true);
      
      saveChatWithGuest(value.data.result);
    };
    socket.on(`messagesRetrieved:${userId}`, onListenEvent);

    // Remove event listener on component unmount
    return () => socket.off(`messagesRetrieved:${userId}`);
  };

  // get current updates fro sent messages or received msgs
  const getUpdates = () => {
    const onListenEvent = (value: any) => {
      setNewMsg(value.data);
    };
    socket.on(`messageSent:${chatWithGuest[0].chat.id}`, onListenEvent);

    // Remove event listener on component unmount
    return () => socket.off(`messageSent:${chatWithGuest[0].chat.id}`);
  };

  // connect to the chat room once page loads or when chat id is changed
  useEffect(() => {
    const payload = {
      token: token,
      chatBuddy: guestId? guestId : guestInfo.id,
      page: chatWithGuestPage,
    };
    socket.emit("retrieveMessages", payload);
  }, [socket, guestInfo]);

  useEffect(() => {
    if (!chatWithGuest.length) {
      getMessages();
    }
  }, [socket, guestId, refetch]);

  useEffect(() => {
    if (isLoaded) {
      getUpdates();
    }
  }, [socket, isLoaded]);

  // add updated messages to the chat message array
  useEffect(() => {
    if (newMsg) {
      const filtered = chatWithGuest.filter((where) => where.id === newMsg.id);
      if (!filtered.length) {
        const newChat = [...chatWithGuest, newMsg];
        saveChatWithGuest(newChat);
      }
    }
  }, [newMsg, socket]);

  console.log(newMsg, chatWithGuest);
  

  // Scroll to the bottom of the div when new message is added
  const scrollRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatWithGuest]);

  return (
    <div className="h-full overflow-y-auto" ref={scrollRef}>
      <div className="p-2">
        <div className="grid gap-3">
          {chatWithGuest.map((item) => (
            <div className="flex" key={item.id}>
              <ChatBubble
                type={item.initiator.id}
                text={item.message || ""}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatBody;
