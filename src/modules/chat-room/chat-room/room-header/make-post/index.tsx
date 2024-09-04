import { FC } from "react";
import IndexDisplayUi from "./index-display";

interface Props {
  socket: any;
  setReload: () => void;
}
const MakePostIndex: FC<Props> = ({ socket, setReload }) => {
  return (
    <div>
      <div>
        <IndexDisplayUi socket={socket} setReload={setReload} />
      </div>
    </div>
  );
};

export default MakePostIndex;
