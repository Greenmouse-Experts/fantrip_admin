import { FC, useEffect, useState } from "react";
import useAuth from "../../../../../../hooks/authUser";
import { CommunityItemTyping } from "../community-list";
import ItemRender from "./item-render";

interface Props {
  socket: any;
  close: () => void;
  change: string;
  setChange: React.Dispatch<React.SetStateAction<string>>;
}
const DisplayList: FC<Props> = ({ socket, change, setChange }) => {
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
    socket.emit("retrieveCommunities", payload);
  }, [change]);

  useEffect(() => {
    getCommunities();
  }, [socket, change]);

  return (
    <div>
      <div className="mt-3 grid gap-1">
        {prevCommunities.map((item: CommunityItemTyping) => (
          <ItemRender
            socket={socket}
            item={item}
            key={item.id}
            setChange={setChange}
          />
        ))}
      </div>
    </div>
  );
};

export default DisplayList;
