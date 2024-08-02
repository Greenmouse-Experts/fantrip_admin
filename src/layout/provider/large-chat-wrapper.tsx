import { FC } from "react";

interface Props {
  open: boolean;
  children: JSX.Element;
}
const LargeChatWrapper: FC<Props> = ({ open, children }) => {
  return (
    <>
      {open && (
        <div className="fixed rounded-t-xl overflow-hidden bottom-5 right-5 w-[350px] h-[400px] bg-white z-[4000]">
          {children}
        </div>
      )}
    </>
  );
};

export default LargeChatWrapper;
