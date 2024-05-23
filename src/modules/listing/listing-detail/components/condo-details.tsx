import { FC } from "react";
import { CiDiscount1 } from "react-icons/ci";
import { FaStar } from "react-icons/fa6";
import { HiOutlineLocationMarker, HiOutlineStar } from "react-icons/hi";
import { IoChatboxEllipsesOutline, IoPricetagOutline } from "react-icons/io5";
import { MdOutlineBalcony } from "react-icons/md";
import { AmenityItem } from "../../../../contracts/routine";

interface Props {
  name: string;
  desc: string;
  unique: string;
  amenities: AmenityItem[];
  property_name: string;
  special: string[];
  address: string;
  price: number;
  percent: number;
}
const CondoDetails: FC<Props> = ({
  name,
  desc,
  unique,
  amenities,
  special,
  property_name,
  address,
  price,
  percent,
}) => {
  return (
    <div>
      <div className="flex gap-x-4">
        <div className="flex px-4 py-2 shadow-lg gap-x-3 items-center">
          <FaStar className="text-[#9847FE]" />
          <p className="fw-500">Top Rated</p>
        </div>
        <div className="flex px-4 py-2 shadow-lg gap-x-3 items-center">
          <IoChatboxEllipsesOutline className="text-[#9847FE]" />
          <p className="fw-500">Ask a question</p>
        </div>
      </div>
      <div className="mt-6 lg:mt-10 border-b border-[#D2D2D2] pb-5 lg:pb-8">
        <p className="text-lg lg:text-3xl fw-600">
          {name} ({property_name})
        </p>
        <p className="mt-2 text-[#494949]">{desc}</p>
        <div className="mt-2 flex gap-x-2 items-center">
          <HiOutlineLocationMarker className="text-[#494949]" />
          <p className="syne text-[#494949]">{address}</p>
        </div>
      </div>
      <div className="mt-6 border-b border-[#D2D2D2] pb-5 lg:pb-8">
        <p className="fw-600 lg:text-lg">Amenities and Unique Features</p>
        <div className="mt-4">
          <ul className="grid lg:grid-cols-2 gap-5">
            {amenities.length &&
              amenities.map((item) => (
                <li className="flex items-center gap-x-3" key={item.id}>
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt="icon-description"
                      className="w-[18px]"
                    />
                  ) : (
                    <HiOutlineStar className="text-[17px] text-[#9847FE]" />
                  )}
                  <p className="fs-400">{item.name}</p>
                </li>
              ))}
            <li className="flex items-center gap-x-3">
              <MdOutlineBalcony className="text-[#9847FE]" />
              <p className="fs-400">{unique}</p>
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-6 border-b border-[#D2D2D2] pb-5 lg:pb-8">
        <p className="fw-600 lg:text-lg">Special Offers</p>
        <div className="mt-5">
          <ul className="grid gap-5">
            {special.map((item, i) => (
              <li className="flex items-center gap-x-3" key={i}>
                <CiDiscount1 className="text-[18px] text-[#9847FE]" />
                <p className="fs-400">{item}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-6 border-b border-[#D2D2D2] pb-5 lg:pb-8">
        <p className="fw-600 lg:text-lg">Pricing</p>
        <div className="mt-5">
          <ul className="grid gap-5">
            <li className="flex items-center gap-x-3">
              <IoPricetagOutline className="text-[18px] text-[#9847FE]" />
              <p className="fs-400">All Days: €{price}/night</p>
            </li>
            {percent !== 0 && (
              <li className="flex items-center gap-x-3">
                <IoPricetagOutline className="text-[18px] text-[#9847FE]" />
                <p className="fs-400">{percent}% percentage off</p>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CondoDetails;
