import { FC } from "react";
import LeaveComment from "../leave-a-comment";
import PostActions from "../post-actions";
import ProfileMore from "../profile-more";

interface Props {
  item: any;
}
const ImagePostRender: FC<Props> = ({ item }) => {
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
                      item.image ||
                      "https://res.cloudinary.com/greenmouse-tech/image/upload/v1721902661/fantrip/avatars_cyhkdy.webp"
                    }
                    alt="profile"
                    className="w-full h-full circle object-cover"
                  />
                </div>
                <div>
                  <p className="fw-500 fs-500">{item.posterName}</p>
                  <p className="opacity-80 fs-300">
                    <span className="capitalize fw-500">{item.role}</span>
                    {" - "}
                    <span>{item.time}</span>
                  </p>
                </div>
              </div>
              <ProfileMore />
            </div>
            <div className="mt-3">
              <p>{item.post}</p>
            </div>
          </div>
          <div className="bg-gradient-to-r from-gray-400 to-gray-500 h-[300px]">
            <img src={item.file} alt="post-image" className="h-full mx-auto" />
          </div>
        </div>
        <div className="mt-3">
          <PostActions
            id=""
            like={item.like}
            dislike={item.dislike}
            comment={item.comment}
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

export default ImagePostRender;
