import { FC, useState } from 'react'
import { TbArrowBigDown, TbArrowBigUp } from 'react-icons/tb';
import useAuth from '../../../../../../../../../hooks/authUser';

interface Props {
    type: string;
    like: number;
    dislike: number;
    comment: number;
    id: string;
    socket: any;
  }
const CommentAction:FC<Props> = ({type, like, dislike, comment, id, socket}) => {
    const { token } = useAuth();
  const [statCount, setStatCount] = useState({
    initLike: like,
    initDislike: dislike,
    initComment: comment,
  });
//   const [showComment, setShowComment] = useState(false);
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

  const handleAction = (type: string) => {
    const payload = {
      token: token,
      reaction: type, // options: upvote, downvote
      reactionFor: "comment", // options: post, comment, reply, poll, quiz
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
  return (
    <div className='flex justify-end'>
        <div className="flex justify-between items-center gap-x-3">
          <button
            type="button"
            className={`${
              type === "text"
                ? `${
                    likeAction === "like"
                      ? "bg-green-600 text-white"
                      : "bg-white "
                  }`
                : `${
                    likeAction === "like"
                      ? "bg-green-600 text-white"
                      : "bg-[#EDEDFF] dark:bg-darkColor"
                  }`
            } flex items-center gap-x-1 rounded-full px-2 py-[2px]`}
            onClick={() => handleAction("upvote")}
          >
            <TbArrowBigUp size={13} className='dark:text-white'/>
            <p className='fs-400 '>{statCount.initLike}</p>
          </button>
          <button
            type="button"
            className={`${
              type === "text"
                ? `${
                    likeAction === "dislike"
                      ? "bg-red-600 text-white"
                      : "bg-white "
                  }`
                : `${
                    likeAction === "dislike"
                      ? "bg-red-600 text-white"
                      : "bg-[#EDEDFF] dark:bg-darkColor"
                  }`
            } flex items-center gap-x-1 rounded-full px-2 py-[2px]`}
            onClick={() => handleAction("downvote")}
          >
            <TbArrowBigDown size={14} className='dark:text-white'/>
            <p className='fs-400 '>{statCount.initDislike}</p>
          </button>
        </div>
    </div>
  )
}

export default CommentAction