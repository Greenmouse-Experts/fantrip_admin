import { FC, useEffect, useRef, useState } from "react";
import ChatBubble from "./component/chat-bubble";
import { useChat } from "@/hooks/useChat";
import useAuth from "@/hooks/authUser";
import { ChatItem2 } from "@/lib/contracts/chat";

interface Props {
  socket: any;
}
const ChatBody: FC<Props> = ({ socket }) => {
  const { hostId, chatWithHost, hostInfo, chatWithHostPage, saveChatWithHost } =
    useChat();
  const { token, userId } = useAuth();
  const [newMsg, setNewMsg] = useState<ChatItem2>();
  const [isLoaded, setIsLoaded] = useState(false)

  // on load get previous messages or message history
  const getMessages = () => {
    const onListenEvent = (value: any) => {
      setIsLoaded(true)
      saveChatWithHost(value.data.result);
    };
    socket.on(`messagesRetrieved:${userId}`, onListenEvent);

    // Remove event listener on component unmount
    return () => socket.off(`messagesRetrieved:${userId}`);
  };

  // get current updates fro sent messages or received msgs
  const getUpdates = () => {
    const onListenEvent = (value: any) => {
      console.log(value.data, 'inside listener');
      setNewMsg(value.data);
    };
    socket.on(`messageSent:${chatWithHost[0].chat.id}`, onListenEvent);

    // Remove event listener on component unmount
    return () => socket.off(`messageSent:${chatWithHost[0].chat.id}`);
  };

   // connect to the chat room once page loads or when chat id is changed
  useEffect(() => {
    const payload = {
      token: token,
      chatBuddy: hostId,
      page: chatWithHostPage,
    };
    socket.emit("retrieveMessages", payload);
  }, [socket, hostInfo]);

  useEffect(() => {
    if(!chatWithHost.length){
      getMessages();
    }
  }, [socket, hostId]);

  useEffect(() => {
    if (isLoaded) {
      getUpdates();
    }
  }, [socket, isLoaded]);

   // add updated messages to the chat message array
   useEffect(() => {
    if (newMsg) {
      const filtered = chatWithHost.filter((where) => where.id === newMsg.id);
      if (!filtered.length) {
        const newChat = [...chatWithHost, newMsg];
        saveChatWithHost(newChat);
      }
    }
  }, [newMsg, socket]);
  

    // Scroll to the bottom of the div when new message is added
    const scrollRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    }, [chatWithHost]);

  return (
    <div className="h-full overflow-y-auto" ref={scrollRef}>
      <div className="p-2">
        <div className="grid gap-3">
          {chatWithHost.map((item) => (
            <div className="flex" key={item.id}>
              <ChatBubble
                type={item.initiator.role}
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
