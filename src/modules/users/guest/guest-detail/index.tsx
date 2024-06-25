import { FC } from "react";
import GuestContent from "./component/guest-content";
import ProfileSidebar from "./component/profile-sidebar";
import { UserItem } from "../../../../contracts/users";

interface Props {
  data: UserItem;
}
const GuestDetailIndex: FC<Props> = ({ data }) => {
  return (
    <div>
      <div className="lg:flex items-stretch gap-5 pt-5">
        <div className="w-[37%] bg-[#FFEDF2] dark:bg-[#131313] p-5 min-h-[60vh] rounded-lg shadow-lg">
          <ProfileSidebar data={data} />
        </div>
        <div className="w-[63%] min-h-[60vh] bg-[#FFEDF2] col-span-2 dark:bg-[#131313] p-5 rounded shadow-sm">
          <GuestContent />
        </div>
      </div>
    </div>
  );
};

export default GuestDetailIndex;
