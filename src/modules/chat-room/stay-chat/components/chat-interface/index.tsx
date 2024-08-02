import { FC } from "react";
import ChatBody from "./chat-body";
import ChatFooter from "./chat-footer";
import ChatHeader from "./chat-header";
import io from "socket.io-client";
import { SOCKET_URL } from "@/services/constant";

interface Props {
  close: () => void;
}

const socket = io(`${SOCKET_URL}`);

const ChatInterface: FC<Props> = ({ close }) => {
  return (
    <div className="h-full">
      <div className="h-[64px]">
        <ChatHeader close={close} />
      </div>
      <div className="h-[calc(100%_-_130px)]">
        <ChatBody socket={socket} />
      </div>
      <div className="h-[66px] border">
        <ChatFooter socket={socket} />
      </div>
    </div>
  );
};

export default ChatInterface;
