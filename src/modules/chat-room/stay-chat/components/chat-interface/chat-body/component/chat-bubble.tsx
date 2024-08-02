import { FC } from "react";

interface Props {
  type: string;
  text: string;
}
const ChatBubble: FC<Props> = ({ type, text }) => {
  if (type === "host")
    return (
      <div className="rounded-r-[18px] rounded-b-[18px] bg-[#9847fe] text-white p-3 max-w-[80%]">
        <p className="fs-500">
         {text}
        </p>
      </div>
    );
  else if (type === "guest")
    return (
      <div className="w-full flex justify-end">
        <div className="rounded-l-[18px] rounded-t-[18px] bg-[#fc81a0b5] text-black p-3 max-w-[80%]">
        <p className="fs-500">
          {text}
        </p>
      </div>
      </div>
    );
  else return null;
};

export default ChatBubble;
