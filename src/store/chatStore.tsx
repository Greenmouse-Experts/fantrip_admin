import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { ChatUserItem } from "../contracts/chat";

interface Props {
  guest: ChatUserItem;
  saveGuestChat: (data: ChatUserItem) => void;
  clearGuest: () => void;
}
const chatInitState = {
  guest: {
    page: 1,
    activeId: "",
    user: {
      firstName: "",
      lastName: "",
      nickname: "",
      verifiedAsHost: false,
      role: "",
      picture: "",
      id: "",
    },
    chats: [],
  },
};
const useChatStore = create<Props>()(
  persist(
    (set) => ({
      guest: chatInitState.guest,
      saveGuestChat: (data: ChatUserItem) =>
        set(() => ({
          guest: data,
        })),
      clearGuest: () =>
        set(() => ({
          guest: chatInitState.guest,
        })),
    }),
    {
      name: "fantrip_admin_chat",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useChatStore;
