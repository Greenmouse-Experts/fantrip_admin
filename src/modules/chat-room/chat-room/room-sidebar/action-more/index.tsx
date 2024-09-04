import { FC } from "react";
import ActionLists from "./components/action-list"

interface Props {
  socket: any;
  reload: () => void;
}
const ActionMoreIndex:FC<Props> = ({socket, reload }) => {
  return (
    <div>
      <p className="text-[#8C8C8C] fw-500 fs-500">Actions and More</p>
      <div className="mt-4">
        <ActionLists socket={socket} reload={reload} />
      </div>
    </div>
  );
}

export default ActionMoreIndex