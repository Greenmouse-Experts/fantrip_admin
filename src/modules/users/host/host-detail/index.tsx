import { FC } from "react";
import { HostDetailItem } from "../../../../contracts/users";
import HostContent from "./components/host-content"
import ProfileSidebar from "./components/profile-sidebar"

interface Props {
  data: HostDetailItem;
}
const HostDetailIndex:FC<Props> = ({data}) => {
  return (
    <div className="lg:flex items-start gap-5 pt-5">
        <div className="w-[27%] bg-[#FFEDF2] dark:bg-[#131313] p-5 min-h-[80vh] rounded-lg shadow-lg">
            <ProfileSidebar user={data}/>
        </div>
        <div className="w-[73%] h-auto">
            <HostContent user={data}/>
        </div>
    </div>
  )
}

export default HostDetailIndex