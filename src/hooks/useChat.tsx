
import { UserChatInfo } from "../contracts/chat";
import useChatStore from "../store/chatStore";

export function useChat() {
  const guest = useChatStore((state) => state.guest);
  const saveGuest = useChatStore((state) => state.saveGuestChat);
  const community = useChatStore((state) => state.community);
  const saveCommunity = useChatStore((state) => state.saveCommunity)
  // const clearGuest = useChatStore((state) => state.clearGuest);

  const guestInfo = guest.user;
  const guestId = guest.activeId;
  const chatWithGuest = guest.chats;
  const chatWithGuestPage = guest.page

  const saveGuestInfo = (item: UserChatInfo, id: string) => {
    saveGuest({
      ...guest,
      activeId: id,
      user: item,
      chats: []
    });
  };

  const saveChatWithGuest = (chat: any) => {
    saveGuest({
      ...guest,
      chats: chat,
    });
  };

  const clearChatWithGuest = () => {
    saveGuest({
      ...guest,
      chats: [],
    });
  };

  return {
    guestId,
    guestInfo,
    chatWithGuest,
    chatWithGuestPage,
    community,
    saveCommunity,
    saveGuestInfo,
    saveChatWithGuest,
    clearChatWithGuest,
  };
}
