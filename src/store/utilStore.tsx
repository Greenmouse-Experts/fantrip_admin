import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { UtilsStoreItem } from "../contracts/utils";


interface Props {
  utils: UtilsStoreItem;
  saveUtils: (data: UtilsStoreItem) => void;
  clearUtils: () => void;
}
const utilsInitState = {
  chatModal: false
};

const useUtilsStore = create<Props>()(
  persist(
    (set) => ({
      utils: utilsInitState,
      saveUtils: (data: UtilsStoreItem) =>
        set(() => ({
          utils: data,
        })),
      clearUtils: () =>
        set(() => ({
            utils: utilsInitState,
        })),
    }),
    {
      name: "fantrip_admin_utils",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useUtilsStore;
