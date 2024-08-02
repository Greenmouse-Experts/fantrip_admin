import { Suspense } from "react";
import ChatInterface from "../../modules/chat-room/stay-chat/components/chat-interface";
import LargeChatWrapper from "./large-chat-wrapper";
import { useUtils } from "../../hooks/useUtils";
import { Drawer } from "@material-tailwind/react";

const ChatProvider = () => {
  const { stayChatModal: showModal, toggleStayChatmodal: setShowModal } =
    useUtils();
  return (
    <div className="">
      <div className="hidden lg:block">
        <Suspense fallback={<div>Loading...</div>}>
          <LargeChatWrapper open={showModal}>
            <ChatInterface close={() => setShowModal(false)} />
          </LargeChatWrapper>
        </Suspense>
      </div>
      <div className="lg:hidden">
        <Drawer
          open={showModal}
          placement="bottom"
          onClose={() => setShowModal(false)}
        >
          <div className="mobile-chat-container">
            <ChatInterface close={() => setShowModal(false)} />
          </div>
        </Drawer>
      </div>
    </div>
  );
};

export default ChatProvider;
