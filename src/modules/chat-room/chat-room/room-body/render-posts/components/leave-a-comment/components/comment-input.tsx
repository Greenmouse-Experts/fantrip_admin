import { FC, useState } from "react";
import { IoSend } from "react-icons/io5";
import useAuth from "../../../../../../../../hooks/authUser";

interface Props {
  socket: any;
  id: string;
  addComment: () => void;
}
const CommentInput:FC<Props> = ({socket, id, addComment}) => {
  const {token} = useAuth()
  const [msgInput, setMsgInput] = useState("");
  const handleAddComment = () => {
    const payload = {
      token: token,
      message: msgInput,
      postId: id,
    };
    socket.emit("createComment", payload);
    setMsgInput("");
    addComment();
  };

  return (
    <div className="bg-[#EFEFEF] dark:bg-darkColorLight dark:border-white dark:border  flex items-center w-full rounded-full overflow-hidden">
      <input
        type="textarea"
        value={msgInput}
        className={`w-full border-none outline-none bg-transparent p-2 pl-4 dark:text-white`}
        placeholder="Leave a comment..."
        onChange={(e) => setMsgInput(e.target.value)}
      />
      <div className="flex items-center gap-x-2 justify-end pr-2 shrink-0">
        {/* <BsEmojiSmile className="text-[#8C8C8C] fs-500 cursor-pointer" />
        <IoCameraOutline className="text-[#8C8C8C] text-xl cursor-pointer" /> */}
        {!!msgInput.length && (
          <IoSend
            onClick={handleAddComment}
            className="text-prima shrink-0 ml-2 text-2xl cursor-pointer"
          />
        )}
      </div>
    </div>
  );
};

export default CommentInput;
