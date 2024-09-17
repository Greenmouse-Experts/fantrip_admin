
import { FC } from "react";
import CommentAction from "../comment-action";
import ProfileModal from "../../../profile-more/profile-modal";
import ProfileMore from "../../../profile-more";
import { CommentItem } from "../../../../../../../../../contracts/chat";
import ProfileAvatar from "../../../../../../../../../components/ProfileAvatar";
import useDialog from "../../../../../../../../../hooks/useDialog";

interface Props {
  comment: CommentItem;
  socket: any;
  reload: () => void
}
const RenderComment: FC<Props> = ({ comment, socket, reload }) => {
    const {Dialog, setShowModal} = useDialog()

  return (
    <div className="flex gap-x-1">
      <div
        className="w-[40px] cursor-pointer mt-[2px] shrink-0"
        onClick={() => setShowModal(true)}
      >
        <ProfileAvatar
          url={comment.user.picture}
          name={`${comment.user.firstName} ${comment.user.lastName}`}
          size={40}
          font={18}
        />
      </div>
      <div className="w-full bg-white dark:bg-darkColorLight bg-opacity-30 px-2 py-1 shadow-sm">
        <div className="flex justify-between items-center">
          <p className="fw-500 fs-500">{`${comment.user.firstName} ${comment.user.lastName}`}</p>
          <div>
            <ProfileMore
              socket={socket}
              id={comment.id}
              user={comment.user}
              openUser={() => setShowModal(true)}
              reload={reload}
              type="comment"
            />
          </div>
        </div>
        <p className="fs-500">{comment.message}</p>
        <div className="mt-2">
          <CommentAction
            socket={socket}
            like={comment.upvotes}
            dislike={comment.downvotes}
            id={comment.id}
            type="post"
            comment={comment.totalReplies}
          />
        </div>
      </div>
      <Dialog title={`User Profile`} size={"md"}>
        <ProfileModal user={comment.user} close={() => setShowModal(false)} />
      </Dialog>
    </div>
  );
};

export default RenderComment;
