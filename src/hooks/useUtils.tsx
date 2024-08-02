import useUtilsStore from "../store/utilStore";


export function useUtils() {
  const utils = useUtilsStore((state) => state.utils);
  const saveUtils = useUtilsStore((state) => state.saveUtils);
  const stayChatModal = utils.chatModal

  const toggleStayChatmodal = (val:boolean) => {
    saveUtils({
      ...utils,
     chatModal: val
    })
  }
  return {
    utils,
    stayChatModal,
    toggleStayChatmodal
  };
}
