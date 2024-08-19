import { useQuery } from "@tanstack/react-query";
import { getReservations } from "../../../services/api/booking-api";
import HueSpinner from "../../../components/loaders/hue-spinner";
import ReservationTableListing from "./table-listing";
import { useState } from "react";
import { toast } from "react-toastify";
import ReservationFilter from "./filter";

const ReservationListing = () => {
  const [params, setParams] = useState({
    page: 1,
    status: "pending",
  });
  const { isLoading, data } = useQuery({
    queryKey: ["get-reservation", params],
    queryFn: () => getReservations(params),
  });
  const count = data?.count;
  const handleNext = () => {
    if (params.page * 12 >= count) {
      toast.info("This is the last page");
    } else {
      setParams({
        ...params,
        page: params.page + 1,
      });
    }
  };
  const handlePrev = () => {
    if (params.page === 1) {
      toast.info("This is the first page");
    } else {
      setParams({
        ...params,
        page: params.page - 1,
      });
    }
  };
  return (
    <div>
      <div className="absolute top-0 right-0">
        <ReservationFilter param={params} setParams={setParams}/>
      </div>
      {isLoading && (
        <div className="place-center py-12 lg:py-24">
          <HueSpinner size={1.3} />
        </div>
      )}
      {!isLoading && !!data?.data?.length && (
        <ReservationTableListing
          data={data?.data}
          page={params.page}
          count={count || 0}
          next={handleNext}
          prev={handlePrev}
        />
      )}
    </div>
  );
};

export default ReservationListing;
