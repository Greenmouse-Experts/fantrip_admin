import { FC } from "react";
import dayjs from "dayjs";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { useQuery } from "@tanstack/react-query";
import { getStayReviews } from "../../../../services/api/stay-api";
import RatingComponent from "../../../../components/rating-component";
import { ReviewResult } from "../../../../contracts/stay";

interface Props {
  id: string;
}
const CondoRatings:FC<Props> = ({id}) => {
   const { data, isLoading } = useQuery({
     queryKey: ["get-stay-review"],
     queryFn: () => getStayReviews(id),
   });
  return (
    <div className="pb-6 border-b border-[#D2D2D2]">
      <div>
        <p className="fw-600 lg:text-lg">Ratings and Reviews</p>
      </div>
      {!isLoading && data && (
        <div>
          <div className="mt-5 flex gap-x-4 items-end">
            <p className="text-lg lg:text-4xl fw-600">{data?.data.avgRating}</p>
            <div className="flex gap-x-3 relative -top-2">
              <RatingComponent
                type={"review"}
                value={Number(data?.data.avgRating)}
                setValue={() => false}
                size={17}
              />
            </div>
            <p className="fw-500 relative -top-1">/5.0 ratings</p>
          </div>
          <div className="mt-6 grid gap-5">
            {!!data?.data?.results.length &&
              data?.data?.results.map((item: ReviewResult) => (
                <div>
                  <div className="flex gap-x-2 items-center">
                    <p className="fw-600">{`${item.user.firstName} ${item.user.lastName}`}</p>
                    <RiVerifiedBadgeFill className="text-[#9847FE]" />
                  </div>
                  <div className="flex gap-x-1 mt-[6px]">
                    <RatingComponent
                      type={"review"}
                      value={Number(item.rating)}
                      setValue={() => false}
                      size={14}
                    />
                  </div>
                  <p className="mt-5 fs-500">"{item.comment}"</p>
                  <p className="mt-2 text-[#9C9C9C] fs-400">
                    Reviewed on {dayjs(item.createdDate).format("DD/MM/YYYY")}
                  </p>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CondoRatings;
