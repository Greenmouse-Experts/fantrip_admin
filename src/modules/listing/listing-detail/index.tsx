import StayGallery from "./components/gallery";
import { FaStar } from "react-icons/fa6";
import CondoDetails from "./components/condo-details";
import CondoRatings from "./components/ratings";
import Availability from "./components/availability";
import { FC } from "react";
import { StayItem } from "../../../contracts/stay";
import ExtraInfo from "./components/extra-info";

interface Props {
  data: StayItem;
}
const StayDetailsIndex: FC<Props> = ({ data }) => {
  const {
    id,
    photos,
    price,
    amenities,
    property,
    name,
    specialOffers,
    description,
    uniqueFeature,
    availableFrom,
    availableTo,
    address,
    percentageOff,
    highlightFeature
  } = data;
  return (
    <div>
      <div className="lg:flex gap-7 lg:gap-x-12">
        <div className="lg:w-7/12 relative">
          <StayGallery data={photos} />
          <div className="absolute z-20 top-3 left-3 w-[150px]">
            <div className="bg-[#FFEDF2] rounded-t-[10px] text-center p-4 pb-7">
              <p className="fs-300 fw-500">5 Star Rating</p>
            </div>
            <div className="p-2 pb-4 pt-6 relative bg-white rounded-b-[10px]">
              <li className="fs-300">Recommended</li>
              <li className="fs-300 mt-1">{highlightFeature}</li>
              <div className="absolute left-0 w-full -top-[12px]  flex justify-center">
                <div className="w-6 h-6 circle bg-white place-center circle-shadow">
                  <FaStar className="text-sm text-[#9847FE]" />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-7">
            <CondoDetails
              name={name}
              desc={description}
              property_name={property.name}
              amenities={amenities}
              unique={uniqueFeature}
              special={specialOffers}
              address={address}
              price={price}
              percent={percentageOff}
            />
          </div>
          <div className="mt-7">
            <CondoRatings id={id} />
          </div>
          <div className="mt-7">
            <Availability from={availableFrom} to={availableTo} />
          </div>
        </div>
        <div className="w-5/12">
          <ExtraInfo stay={data}/>
        </div>
      </div>
      <div className="mt-12 lg:mt-20 bg-[#EDEDFF] p-4 lg:px-8 lg:py-12 rounded-[11px]">
        <p className="text-[#494949] lg:w-9/12 mx-auto text-center">
          Make your next game day unforgettable by staying in the heart of the
          action. Ready to feel the roar of the crowd and the comfort of home?
          Book now or message us for more details!
        </p>
      </div>
    </div>
  );
};

export default StayDetailsIndex;
