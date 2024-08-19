import { FC } from "react";
import ExternalLinks from "./external-links"
import MakePostIndex from "./make-post"
import SearchCompIndex from "./search-comp"


interface Props {
  socket: any;
  setReload: () => void;
}
const RoomHeaderIndex:FC<Props> = ({}) => {
  return (
    <div className="lg:flex items-center gap-x-6">
        <div className="w-[30%]">
            <SearchCompIndex/>
        </div>
        <div className="w-[45%]">
            <MakePostIndex/>
        </div>
        <div className="w-[25%]">
            <ExternalLinks/>
        </div>
    </div>
  )
}

export default RoomHeaderIndex