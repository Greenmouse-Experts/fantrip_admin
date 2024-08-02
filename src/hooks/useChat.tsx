
import { UserChatInfo } from "../contracts/chat";
import useChatStore from "../store/chatStore";

export function useChat() {
  const guest = useChatStore((state) => state.guest);
  const saveGuest = useChatStore((state) => state.saveGuestChat);
  const clearGuest = useChatStore((state) => state.clearGuest);

  const guestInfo = guest.user;
  const guestId = guest.activeId;
  const chatWithGuest = guest.chats;

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
    saveGuestInfo,
    saveChatWithGuest,
    clearChatWithGuest,
  };
}
