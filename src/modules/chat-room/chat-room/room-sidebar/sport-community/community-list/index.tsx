import { FC, useEffect, useState } from "react";
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
interface Props{
  socket:any
}
const CommunityList:FC<Props> = ({socket}) => {
  const [prevCommunities, setPrevCommunities] = useState<CommunityItemTyping[]>(
    []
  );
  const { token } = useAuth();

  const getCommunities = () => {
    const onListenEvent = (value: any) => {
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
    socket.emit("retrieveCommunities", payload);
  }, []);

  useEffect(() => {
    getCommunities();
  }, [socket]);
  
  return (
    <div className="mt-3 grid gap-1">
      {prevCommunities.map((item: CommunityItemTyping) => (
        <ItemRender item={item} key={item.id} />
      ))}
    </div>
  );
};

export default CommunityList;
