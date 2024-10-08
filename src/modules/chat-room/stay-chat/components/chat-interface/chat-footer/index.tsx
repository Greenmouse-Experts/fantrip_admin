import { FC, useState } from "react";
import { IoSend } from "react-icons/io5";
import { useChat } from "../../../../../../hooks/useChat";
import useAuth from "../../../../../../hooks/authUser";

interface Props {
  socket: any;
  refetch: React.Dispatch<React.SetStateAction<string>>
}
const ChatFooter: FC<Props> = ({socket, refetch}) => {
  const { guestInfo } = useChat();
  const { token } = useAuth();
  const [msgInput, setMsgInput] = useState("");
  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (msgInput === "") {
      return;
    }
    // console.log({
    //   chatBuddy: guestInfo.id,
    //   message: msgInput,
    //   file: null,
    //   token: `${token}`,
    // });
    
    socket.emit("sendMessage", {
      chatBuddy: guestInfo.id,
      message: msgInput,
      file: null,
      token: `${token}`,
    });
    setMsgInput("");
    refetch(new Date().toLocaleString())
  };
  return (
    <div className="p-2">
      <form
        onSubmit={handleSend}
        className="border border-gray-500 rounded-full flex"
      >
        <input
          type="text"
          value={msgInput}
          placeholder="Type a message..."
          className="p-2 pl-4 w-full rounded-l-full outline-none"
          onChange={(e) => setMsgInput(e.target.value)}
        />
        <button
          className="w-16 shrink-0 place-center bg-[#9847fe] rounded-r-full text-white"
          onClick={handleSend}
        >
          <IoSend className="text-xl" />
        </button>
      </form>
    </div>
  );
};

export default ChatFooter;
