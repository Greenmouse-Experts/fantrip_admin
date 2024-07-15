import { FC } from "react";
import { ReccomendationItem } from "../../../contracts/reccomendation";
import GuideImageSlider from "../../../components/GuideImageSlider";
import { FaRegUser } from "react-icons/fa6";
import dayjs from "dayjs";
import { IoLocationOutline } from "react-icons/io5";
import { BiCategoryAlt } from "react-icons/bi";
import { formatName } from "../../../utils/formatHelp";
import PlacesReviews from "./reviews";

interface Props {
  data: ReccomendationItem;
}
const RecommendationDetailsIndex: FC<Props> = ({ data }) => {
  const {
    user,
    id,
    photos,
    spot,
    tags,
    name,
    location,
    description,
    createdDate,
  } = data;
  const placeTags = JSON.parse(tags);
  return (
    <div className="py-12">
      <div className="lg:grid items-stretch grid-cols-2 gap-10">
        <div className="w-full min-h-[300px] h-full">
          <GuideImageSlider images={photos} />
        </div>
        <div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-x-1">
              <FaRegUser className="shrink-0" />
              <p className="fw-500">{`${user.firstName} ${user.lastName}`}</p>
            </div>
            <div>
              <p className="opacity-70 fs-500">
                {dayjs(createdDate).format("DD-MMMM-YYYY")}
              </p>
            </div>
          </div>
          <div className="mt-3">
            <p className="text-xl lg:text-3xl fw-600">{name}</p>
            <div className="flex items-center gap-x-1 mt-[2px]">
              <IoLocationOutline className="shrink-0" />
              <p>{location}</p>
            </div>
            <div className="flex items-center gap-x-1 mt-[2px]">
              <BiCategoryAlt className="shrink-0 text-prima" />
              <p className="text-prima">{spot.name}</p>
            </div>
            <p className="mt-5 whitespace-pre-wrap">
              {formatName(description, 430)}
            </p>
          </div>
          <div className="mt-4 grid gap-1">
            {placeTags.map((item: string, i: number) => (
              <div className="flex gap-x-1 items-center" key={i}>
                <p className="bg-layout-gradient w-3 h-3"></p>
                <p>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-8">
        <PlacesReviews id={id} />
      </div>
    </div>
  );
};

export default RecommendationDetailsIndex;
