import useAuth from "../../../../../../../hooks/authUser";
import CommentInput from "./components/comment-input";

const LeaveComment = () => {
  const { user } = useAuth();
  return (
    <div className="flex gap-x-3 items-center">
      <div className="w-[35px] lg:w-[40px] h-[35px] shrink-0 lg:h-[40px] bg-gradient p-[1px] circle">
        <img
          src={
            user.image ||
            "https://res.cloudinary.com/greenmouse-tech/image/upload/v1721902661/fantrip/avatars_cyhkdy.webp"
          }
          alt="profile"
          className="w-full h-full circle object-cover"
        />
      </div>
      <CommentInput />
    </div>
  );
};

export default LeaveComment;
