import { FC, useEffect, useState } from "react";
import useAuth from "../../../../../../hooks/authUser";
import ItemRender from "./item-render";
import dayjs from "dayjs";
import { useChat } from "../../../../../../hooks/useChat";

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
  const { community, saveCommunity } = useChat();
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

   const sortedList = prevCommunities?.length
     ? prevCommunities.sort(
         (a: CommunityItemTyping, b: CommunityItemTyping) =>
           dayjs(a.createdDate).unix() - dayjs(b.createdDate).unix()
       )
     : [];

   useEffect(() => {
     saveCommunity({
       ...community,
       communities: sortedList,
     });
   }, [prevCommunities]);
  
  return (
    <div className="mt-3 grid gap-1">
      {prevCommunities.map((item: CommunityItemTyping) => (
        <ItemRender item={item} key={item.id} />
      ))}
    </div>
  );
};

export default CommunityList;
