import { FC } from "react";
import RenderPostsIndex from "./render-posts"

interface Props {
  reloadSocket: string;
  socket: any
}
const RoomBodyIndex:FC<Props> = ({reloadSocket, socket}) => {
  return (
    <div className="h-full overflow-y-auto scroll-pro">
        <RenderPostsIndex socket={socket} reload={reloadSocket}/>
    </div>
  )
}

export default RoomBodyIndex