import { FC } from "react";
import ProfileAvatar from "../components/ProfileAvatar";

interface Props {
  fname: string;
  lname: string;
  url: string;
}
const UserInfoAvatar: FC<Props> = ({ url, fname, lname }) => {
  return (
    <div className="flex items-center gap-x-2 min-w-[180px]">
      <ProfileAvatar url={url} name={`${fname} ${lname}`} font={18} size={40} />
      <p>{`${fname} ${lname}`}</p>
    </div>
  );
};

export default UserInfoAvatar;
