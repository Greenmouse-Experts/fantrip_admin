import { IoMdAddCircle } from "react-icons/io";
import useDialog from "../../../../../hooks/useDialog";
import CreateCommunity from "./create-communtity";

const SportCommunityIndex = () => {
  const { Dialog, setShowModal } = useDialog();
  return (
    <div>
      <div className="min-h-[170px]">
        <div className="flex justify-between items-center">
          <p className="text-[#8C8C8C] fw-500 fs-500">Sport Communities</p>
          <IoMdAddCircle
            className="cursor-pointer"
            onClick={() => setShowModal(true)}
          />
        </div>
      </div>
      <Dialog title="Add a community" size="sm">
        <CreateCommunity/>
      </Dialog>
    </div>
  );
};

export default SportCommunityIndex;
