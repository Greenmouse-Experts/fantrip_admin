import { FC } from "react";
import PostActions from "../post-actions";
import LeaveComment from "../leave-a-comment";
import ProfileMore from "../profile-more";
import ReactPlayer from "react-player";
import { PostTyping } from "@/lib/contracts/chat";
import dayjs from "dayjs"

interface Props {
  item: PostTyping;
}
const VideoPostRender: FC<Props> = ({ item }) => {
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
                  <p className="opacity-80 fs-300">
                    <span className="capitalize fw-500">{item.user.role}</span>
                    {" - "}
                    <span>{dayjs(item.createdDate).fromNow()}</span>
                  </p>
                </div>
              </div>
              <ProfileMore />
            </div>
            <div className="mt-3">
              <p>{item.message}</p>
            </div>
          </div>
          <div className="bg-gradient-to-r from-gray-400 to-gray-500 h-[300px]">
            <ReactPlayer
              url={item.file}
              width={"100%"}
              height={"300px"}
              controls
            />
          </div>
        </div>
        <div className="mt-3">
          <PostActions
            id=""
            like={item.upvotes}
            dislike={item.downvotes}
            comment={item.threads}
            type="image"
          />
        </div>
      </div>
      <div className="mt-3">
        <LeaveComment />
      </div>
    </div>
  );
};

export default VideoPostRender;
