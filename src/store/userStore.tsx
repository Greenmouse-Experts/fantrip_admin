import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface Props {
  user: userProps;
  saveUser: (data: userProps) => void;
  clearUser: () => void;
}
interface userProps {
  name: string;
  email: string;
  token: string;
  image: string;
  address: string;
  phone: string;
  id: string;
  account: string[];
  joined: string;
  bio: string;
}
const userInitState = {
  name: "",
  email: "",
  token: "",
  image: "",
  address: "",
  account: [],
  phone: "",
  id: "",
  joined: "",
  bio: ""
};
const useAuthStore = create<Props>()(
  persist(
    (set) => ({
      user: userInitState,
      saveUser: (data: userProps) =>
        set(() => ({
          user: data,
        })),
      clearUser: () =>
        set(() => ({
          user: userInitState,
        })),
    }),
    {
      name: "fantrip_admin",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useAuthStore;
