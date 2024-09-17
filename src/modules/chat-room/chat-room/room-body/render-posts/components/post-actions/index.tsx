import { FC, useState } from "react";
import { GoComment } from "react-icons/go";
import { TbArrowBigDown, TbArrowBigUp } from "react-icons/tb";
import ViewComments from "./comments";
import useAuth from "../../../../../../../hooks/authUser";

interface Props {
  type: string;
  like: number;
  dislike: number;
  comment: number;
  id: string;
  socket: any;
  reaction: string | undefined;
}
const PostActions: FC<Props> = ({ type, like, dislike, comment, id, socket, reaction }) => {
  const { token } = useAuth();

  const formatReaction = {
    upvote: "like",
    downvote: "dislike",
  };

  const [statCount, setStatCount] = useState({
    initLike: like,
    initDislike: dislike,
    initComment: comment,
  });

  const [showComment, setShowComment] = useState("");
  const [likeAction, setLikeAction] = useState(
    reaction ? formatReaction[reaction as keyof typeof formatReaction] : ""
  );

  const handleLike = () => {
    if (likeAction === "dislike") {
      setStatCount({ ...statCount, initDislike: statCount.initLike - 1 });
    }
    if (likeAction === "like") {
      setLikeAction("");
      setStatCount({ ...statCount, initLike: statCount.initLike - 1 });
      return;
    }
    setLikeAction("like");
    setStatCount({ ...statCount, initLike: statCount.initLike + 1 });
  };

  const handleDisike = () => {
    if (likeAction === "like") {
      setStatCount({ ...statCount, initLike: statCount.initLike - 1 });
    }
    if (likeAction === "dislike") {
      setLikeAction("");
      setStatCount({ ...statCount, initDislike: statCount.initDislike - 1 });
      return;
    }
    setLikeAction("dislike");
    setStatCount({ ...statCount, initDislike: statCount.initDislike + 1 });
  };

  const handleAction = (type: string) => {
    const payload = {
      token: token,
      reaction: type, // options: upvote, downvote
      reactionFor: "post", // options: post, comment, reply, poll, quiz
      concernId: id,
    };
    socket.emit("react", payload);
    if (type === "upvote") {
      handleLike();
    } else if (type === "downvote") {
      handleDisike();
    } else {
    }
  };

  const handleShowComment = (id: string) => {
    if (id === showComment) {
      setShowComment("");
    } else setShowComment(id);
  };
  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex justify-between items-center gap-x-3">
          <button
            type="button"
            className={`${
              type === "text"
                ? `${
                    likeAction === "like"
                      ? "bg-green-600 text-white"
                      : "bg-white dark:bg-darkColor"
                  }`
                : `${
                    likeAction === "like"
                      ? "bg-green-600 text-white"
                      : "bg-[#EDEDFF] dark:bg-darkColorLight"
                  }`
            } flex items-center gap-x-1 rounded-full px-4 py-[2px]`}
            onClick={() => handleAction("upvote")}
          >
            <TbArrowBigUp className="dark:text-white" />
            <p>{statCount.initLike}</p>
          </button>
          <button
            type="button"
            className={`${
              type === "text"
                ? `${
                    likeAction === "dislike"
                      ? "bg-red-600 text-white"
                      : "bg-white dark:bg-darkColor"
                  }`
                : `${
                    likeAction === "dislike"
                      ? "bg-red-600 text-white"
                      : "bg-[#EDEDFF] dark:bg-darkColorLight"
                  }`
            } flex items-center gap-x-1 rounded-full px-4 py-[2px]`}
            onClick={() => handleAction("downvote")}
          >
            <TbArrowBigDown className="dark:text-white" />
            <p>{statCount.initDislike}</p>
          </button>
        </div>
        <button
          type="button"
          className={`${
            type === "text"
              ? `${
                  showComment
                    ? "bg-blue-600 text-white"
                    : "bg-white dark:bg-darkColor"
                }`
              : `${
                  showComment
                    ? "bg-blue-600 text-white"
                    : "bg-[#EDEDFF] dark:bg-darkColorLight"
                }`
          } flex items-center gap-x-1 rounded-full px-4 py-[2px]`}
          onClick={() => handleShowComment(id)}
        >
          <GoComment className="dark:text-white" />
          <p>{comment || 0}</p>
        </button>
      </div>
      {showComment === id && (
        <ViewComments
          socket={socket}
          id={id}
          count={comment || 0}
          token={token || ""}
        />
      )}
    </div>
  );
};

export default PostActions;
