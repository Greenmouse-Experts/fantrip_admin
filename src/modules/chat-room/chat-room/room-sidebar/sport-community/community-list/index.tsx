import io from "socket.io-client";
import { SOCKET_URL } from "../../../../../../services/constant";
import { useEffect, useState } from "react";
import useAuth from "../../../../../../hooks/authUser";
import ItemRender from "./item-render";

export interface CommunityItemTyping {
  id: string;
  name: string;
  icon: string;
  isDisclosed: boolean;
  type: string;
  createdDate: string;
  updatedDate: string;
}
const socket = io(`${SOCKET_URL}`);
const CommunityList = () => {
  const [prevCommunities, setPrevCommunities] = useState<CommunityItemTyping[]>(
    []
  );
  const { token } = useAuth();

  const getCommunities = () => {
    const onListenEvent = (value: any) => {
      console.log(value);

      setPrevCommunities(value.data.result);
    };
    socket.on(`communitiesRetrieved:${"admin"}`, onListenEvent);

    // Remove event listener on component unmount
    return () => socket.off(`communitiesRetrieved:${"admin"}`);
  };

  useEffect(() => {
    const payload = {
      token: token,
      page: 1,
    };
    socket.emit("retrieveChats", payload);
  }, []);

  useEffect(() => {
    getCommunities();
  }, [socket]);
  return (
    <div>
      {prevCommunities.map((item: CommunityItemTyping) => (
        <ItemRender item={item} key={item.id} />
      ))}
    </div>
  );
};

export default CommunityList;
