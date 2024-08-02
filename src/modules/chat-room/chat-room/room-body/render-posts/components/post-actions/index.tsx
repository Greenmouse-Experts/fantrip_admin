import { FC, useState } from "react";
import { GoComment } from "react-icons/go";
import { TbArrowBigDown, TbArrowBigUp } from "react-icons/tb";
import ViewComments from "./comments";

interface Props {
  type: string;
  like: number;
  dislike: number;
  comment: number;
  id: string;
}
const PostActions: FC<Props> = ({ type, like, dislike, comment }) => {
  const [statCount, setStatCount] = useState({
    initLike: like,
    initDislike: dislike,
    initComment: comment,
  });
  const [showComment, setShowComment] = useState(false);
  const [likeAction, setLikeAction] = useState("");
  
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
                      : "bg-white"
                  }`
                : `${
                    likeAction === "like"
                      ? "bg-green-600 text-white"
                      : "bg-[#EDEDFF]"
                  }`
            } flex items-center gap-x-1 rounded-full px-4 py-[2px]`}
            onClick={() => handleLike()}
          >
            <TbArrowBigUp />
            <p>{statCount.initLike}</p>
          </button>
          <button
            type="button"
            className={`${
              type === "text"
                ? `${
                    likeAction === "dislike"
                      ? "bg-red-600 text-white"
                      : "bg-white"
                  }`
                : `${
                    likeAction === "dislike"
                      ? "bg-red-600 text-white"
                      : "bg-[#EDEDFF]"
                  }`
            } flex items-center gap-x-1 rounded-full px-4 py-[2px]`}
            onClick={() => handleDisike()}
          >
            <TbArrowBigDown />
            <p>{statCount.initDislike}</p>
          </button>
        </div>
        <button
          type="button"
          className={`${
            type === "text"
              ? `${showComment ? "bg-blue-600 text-white" : "bg-white"}`
              : `${showComment ? "bg-blue-600 text-white" : "bg-[#EDEDFF]"}`
          } flex items-center gap-x-1 rounded-full px-4 py-[2px]`}
          onClick={() => setShowComment(!showComment)}
        >
          <GoComment />
          <p>{statCount.initComment}</p>
        </button>
      </div>
      {showComment && <ViewComments />}
    </div>
  );
};

export default PostActions;
