import { FC } from "react";
import RenderPostsIndex from "./render-posts"

interface Props {
  reloadSocket: string;
  socket: any
  reload: () => void
}
const RoomBodyIndex:FC<Props> = ({reloadSocket, socket, reload}) => {
  return (
    <div className="h-full overflow-y-auto scroll-pro">
        <RenderPostsIndex socket={socket} reload={reloadSocket} reloadAction={reload}/>
    </div>
  )
}

export default RoomBodyIndex