import { BsEmojiSmile } from "react-icons/bs";
import { IoCameraOutline } from "react-icons/io5";

const CommentInput = () => {
  return (
    <div className="bg-[#EFEFEF] flex items-center w-full rounded-full overflow-hidden">
      <input
        type="text"
        className="w-full border-none outline-none bg-transparent p-2 pl-4"
        placeholder="Leave a comment..."
      />
      <div className="flex items-center gap-x-2 w-[60px] shrink-0">
        <BsEmojiSmile className="text-[#8C8C8C] fs-500 cursor-pointer" />
        <IoCameraOutline className="text-[#8C8C8C] text-xl cursor-pointer" />
      </div>
    </div>
  );
};

export default CommentInput;
