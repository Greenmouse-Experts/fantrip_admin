import { Suspense, useEffect, useState } from "react";
import ChatInterface from "../../modules/chat-room/stay-chat/components/chat-interface";
import LargeChatWrapper from "./large-chat-wrapper";
import { useUtils } from "../../hooks/useUtils";
import { Drawer } from "@material-tailwind/react";

const ChatProvider = () => {
  const { stayChatModal: showModal, toggleStayChatmodal: setShowModal } =
    useUtils();
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const updateMedia = () => {
      setWidth(window.innerWidth);
    };
    updateMedia();
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });
  return (
    <div className="">
      {width > 960 ? (
        <div className="">
          <Suspense fallback={<div>Loading...</div>}>
            <LargeChatWrapper open={showModal}>
              <ChatInterface close={() => setShowModal(false)} />
            </LargeChatWrapper>
          </Suspense>
        </div>
      ) : (
        <Drawer
          open={showModal}
          placement="bottom"
          onClose={() => setShowModal(false)}
        >
          <div className="mobile-chat-container">
            <ChatInterface close={() => setShowModal(false)} />
          </div>
        </Drawer>
      )}
      {/* <div className="lg:hidden">
        <Drawer
          open={showModal}
          placement="bottom"
          onClose={() => setShowModal(false)}
        >
          <div className="mobile-chat-container">
            <ChatInterface close={() => setShowModal(false)} />
          </div>
        </Drawer>
      </div> */}
    </div>
  );
};

export default ChatProvider;
