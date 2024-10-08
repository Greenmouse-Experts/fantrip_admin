import { useState } from "react";
import { SOCKET_URL } from "../../../services/constant";
import RoomBodyIndex from "./room-body";
import RoomChatListIndex from "./room-chat-list";
import RoomHeaderIndex from "./room-header";
import RoomSidebarIndex from "./room-sidebar";
import io from "socket.io-client";

const socket = io(`${SOCKET_URL}`);
const AdminChatRoomIndex = () => {
  const [reloadSocket, setReloadSocket] = useState("");
  const handleReload = () => {
    setReloadSocket(`${new Date()}`);
  };
  return (
    <div className="w-full">
      <div className="py-6">
        <div className="pb-3">
          <RoomHeaderIndex socket={socket} setReload={handleReload} />
        </div>
        <div className="p-[.5px] bg-[#D2D2D2]"></div>
        <div className="">
          <div className="lg:flex gap-x-4 h-[80vh]">
            <div className="lg:w-[28%] border-r-2 border-[#D2D2D2]">
              <RoomSidebarIndex socket={socket} reload={handleReload} />
            </div>
            <div className="lg:w-[48%]">
              <RoomBodyIndex
                reloadSocket={reloadSocket}
                reload={handleReload}
                socket={socket}
              />
            </div>
            <div className="lg:w-[25%] h-full">
              <RoomChatListIndex socket={socket} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminChatRoomIndex;
