import { FC, useEffect, useState } from "react";
import ImagePostRender from "./components/image-post-render";
import TextPostRender from "./components/text-post-render";
import VideoPostRender from "./components/video-post-render";
import { useChat } from "../../../../../hooks/useChat";
import { PostTyping } from "../../../../../contracts/chat";
import { isImageUrl, isVideoUrl } from "../../../../../utils/helper-function";
import useAuth from "../../../../../hooks/authUser";

interface Props {
  reload: string;
  socket: any;
}
const RenderPostsIndex: FC<Props> = ({ reload, socket }) => {
  const { token, userId } = useAuth();
  const { community } = useChat();
  const [prevPosts, setPrevPosts] = useState<PostTyping[]>([]);

  const getPosts = () => {
    const onListenEvent = (value: any) => {
      setPrevPosts(value.data.result);
    };
    socket.on(`postsRetrieved:admin:${userId}`, onListenEvent);

    // Remove event listener on component unmount
    return () => socket.off(`postsRetrieved:admin:${userId}`);
  };

  useEffect(() => {
    const payload = {
      page: 1,
      token: token,
      ...(community.name !== "all" && { slug: community.name }),
    };
    socket.emit("retrievePosts", payload);
  }, [community, reload]);

  useEffect(() => {
    getPosts();
  }, [socket, reload]);

  return (
    <div className="grid mt-4 gap-4">
      {prevPosts.map((item, i) => {
        if (item.file === null)
          return <TextPostRender socket={socket} item={item} key={i} />;
        if (isImageUrl(item.file))
          return <ImagePostRender socket={socket} item={item} key={i} />;
        if (isVideoUrl(item.file))
          return <VideoPostRender socket={socket} item={item} key={i} />;
      })}
    </div>
  );
};

export default RenderPostsIndex;
