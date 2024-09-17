import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { ChatUserItem, CommunityItem } from "../contracts/chat";

interface Props {
  community: CommunityItem;
  guest: ChatUserItem;
  saveCommunity: (data: CommunityItem) => void;
  saveGuestChat: (data: ChatUserItem) => void;
  clearGuest: () => void;
  clearCommunity: () => void;
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
  community: {
    activeId: "all",
    name: "all",
    communities: []
  }
};
const useChatStore = create<Props>()(
  persist(
    (set) => ({
      guest: chatInitState.guest,
      community: chatInitState.community,
      saveCommunity: (data: CommunityItem) =>
        set(() => ({
          community: data,
        })),
      clearCommunity: () =>
        set(() => ({
          community: chatInitState.community,
        })),
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
