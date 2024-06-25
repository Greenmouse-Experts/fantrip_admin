import { HiOutlineLocationMarker } from "react-icons/hi";
import { IoExpandSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { FC } from "react";
import { StayItem } from "../../../../../contracts/stay";

interface Props{
  stay: StayItem[]
}
const HostStayListing:FC<Props> = ({stay}) => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-xl fw-500">Stay Listing</p>
        <p className="fs-400 fw-500 syne text-primary cursor-pointer">
          See All
        </p>
      </div>
      <div className="mt-4">
        <div className="grid gap-3">
          {stay.map((item) => (
            <div className="bg-[#fbdfe7] dark:bg-[#1d1d1d] fs-500 flex gap-x-2 rounded drop-shadow-sm p-1">
              <img
                src={item.photos[0]}
                alt="room-img"
                className="w-16 h-16 shrink-0"
              />
              <div className="w-full">
                <div className="flex justify-between items-center pr-3">
                  <p className="fw-500">{item.name} ({item.currency}{item.price})</p>
                  <Link to={""}>
                    <IoExpandSharp className="text-primary" />
                  </Link>
                </div>
                <p className="opacity-60 fs-400">{item?.property?.name}</p>
                <div className="fs-300 flex gap-x-1 items-center opacity-60">
                  <HiOutlineLocationMarker />
                  {item?.address}.
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HostStayListing;
