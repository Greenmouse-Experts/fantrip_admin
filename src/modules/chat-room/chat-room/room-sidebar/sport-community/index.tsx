import { FC, useState } from "react";
import { IoMdAddCircle } from "react-icons/io";
import useDialog from "../../../../../hooks/useDialog";
import CreateCommunity from "./create-communtity";
import CommunityList from "./community-list";
import { FaListUl } from "react-icons/fa6";
import DisplayList from "./display-list";

interface Props {
  socket: any;
}
const SportCommunityIndex: FC<Props> = ({ socket }) => {
  const { Dialog, setShowModal } = useDialog();
  const { Dialog: Display, setShowModal: showDisplay } = useDialog();
  const [changeCheck, setChangeCheck] = useState("");

  return (
    <div>
      <div className="min-h-[170px]">
        <div className="flex justify-between items-center">
          <p className="text-[#8C8C8C] fw-500 fs-500">Sport Communities</p>
          <div className="flex gap-x-2 items-center text-primary">
            <IoMdAddCircle
              className="cursor-pointer"
              onClick={() => setShowModal(true)}
            />
            <FaListUl
              className="cursor-pointer"
              onClick={() => showDisplay(true)}
            />
          </div>
        </div>
        <div>
          <CommunityList socket={socket} />
        </div>
      </div>
      <div className="text-black">
        <Dialog title="Add a community" size="sm">
          <CreateCommunity socket={socket} setChange={setChangeCheck} close={() => setShowModal(false)} />
        </Dialog>
        <Display title="Communities" size="sm">
          <DisplayList
            socket={socket}
            change={changeCheck}
            setChange={setChangeCheck}
            close={() => setShowModal(false)}
          />
        </Display>
      </div>
    </div>
  );
};

export default SportCommunityIndex;
