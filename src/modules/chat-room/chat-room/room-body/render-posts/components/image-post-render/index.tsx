import { FC, useState } from "react";
import LeaveComment from "../leave-a-comment";
import PostActions from "../post-actions";
import ProfileMore from "../profile-more";
import dayjs from "dayjs";
import { PostTyping } from "../../../../../../../contracts/chat";
import useDialog from "../../../../../../../hooks/useDialog";
import ProfileModal from "../profile-more/profile-modal";

interface Props {
  item: PostTyping;
  socket: any;
  reload: () => void;
}
const ImagePostRender: FC<Props> = ({ item, socket, reload }) => {
   const { Dialog, setShowModal } = useDialog();
  const [commentCount, setCommentCount] = useState<number>(item.threads);
  const addComment = () => {
    const currentComment = item.threads;
    setCommentCount(Number(currentComment) + 1);
  };
  return (
    <div className="border-b pb-3 border-[#D2D2D2]">
      <div className="">
        <div className="rounded-[12px] overflow-hidden">
          <div className="p-4 bg-gradient rounded-t-[12px] text-white">
            <div className="flex justify-between">
              <div className="flex gap-x-2 items-center">
                <div className="w-[35px] lg:w-[40px] h-[35px] lg:h-[40px] bg-gradient p-[1px] circle">
                  <img
                    src={
                      item.user.picture ||
                      "https://res.cloudinary.com/greenmouse-tech/image/upload/v1721902661/fantrip/avatars_cyhkdy.webp"
                    }
                    alt="profile"
                    className="w-full h-full circle object-cover"
                  />
                </div>
                <div>
                  <p className="fw-500 fs-500">{`${item.user.firstName} ${item.user.lastName}`}</p>
                  <p className="opacity-80  fs-300">
                    <span className="capitalize fw-500">{item.user.role}</span>
                    {" - "}
                    <span>{dayjs(item.createdDate).fromNow()}</span>
                  </p>
                </div>
              </div>
              <ProfileMore
                socket={socket}
                id={item.id}
                user={item.user}
                openUser={() => setShowModal(true)}
                reload={reload}
              />
            </div>
            <div className="mt-3">
              <p>{item.message}</p>
            </div>
          </div>
          <div className="bg-gradient-to-r from-gray-400 to-gray-500 h-[300px]">
            <img src={item.file} alt="post-image" className="h-full mx-auto" />
          </div>
        </div>
        <div className="mt-3">
          <PostActions
            id=""
            like={item.upvotes}
            dislike={item.downvotes}
            comment={commentCount}
            type="image"
            socket={socket}
            reaction={item.myReaction}
          />
        </div>
      </div>
      <div className="mt-3">
        <LeaveComment id={item.id} socket={socket} addComment={addComment} />
      </div>
      <Dialog title={`User Profile`} size="md">
        <ProfileModal user={item.user} close={() => setShowModal(false)} />
      </Dialog>
    </div>
  );
};

export default ImagePostRender;
