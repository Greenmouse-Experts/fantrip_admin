import { FC, useEffect, useState } from "react";
import { CommentItem } from "../../../../../../../../contracts/chat";
import RenderComment from "./render-comments";

interface Props {
  socket: any;
  id: string;
  count: number;
  token: string;
}
const ViewComments:FC<Props> = ({socket, id, count, token}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [reload, setReload] = useState("");
  const [prevComments, setPrevComments] = useState<CommentItem[]>([]);

  const getComments = () => {
    const onListenEvent = (value: any) => {
      setPrevComments(value.data.result);
      setIsLoading(false);
    };
    socket.on(`publishedCommentsRetrieved`, onListenEvent);

    // Remove event listener on component unmount
    return () => socket.off(`publishedCommentsRetrieved`);
  };

  useEffect(() => {
    const payload = {
      token: token,
      postId: id,
      page: 1,
    };
    socket.emit("retrievePublishedComments", payload);
    setIsLoading(true);
  }, [count, reload]);

  useEffect(() => {
    getComments();
  }, [socket, count, reload]);

  const handleReload = () => {
    setReload(`${new Date()}`);
  };

  return (
    <div className="mt-2 bg-[#EDEDFF] dark:bg-darkColorLight p-3 rounded-lg">
      <div>
        <p className="fs-500 fw-500">{count} Comments</p>
      </div>
      <div className="mt-4 grid gap-2">
        {isLoading && <p className="text-center py-5">Loading...</p>}
        {!!prevComments.length &&
          prevComments.map((item) => (
            <RenderComment
              socket={socket}
              comment={item}
              key={item.id}
              reload={handleReload}
            />
          ))}
      </div>
    </div>
  );
}

export default ViewComments