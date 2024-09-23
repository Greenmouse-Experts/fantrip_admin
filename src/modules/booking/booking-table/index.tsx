import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../../services/api/booking-api";
import HueSpinner from "../../../components/loaders/hue-spinner";
import { useState } from "react";
import BookingTableListing from "./table-listing";
import BookingFilter from "./filter";

const BookingListing = () => {
  const [params, setParams] = useState({
    page: 1,
    status: "pending",
  });
  const { isLoading, data } = useQuery({
    queryKey: ["get-booking", params],
    queryFn: () => getBookings(params),
  });
  return (
    <div>
      <div className="mb-3">
        <BookingFilter param={params} setParams={setParams} />
      </div>
      {isLoading && (
        <div className="place-center py-12 lg:py-24">
          <HueSpinner size={1.3} />
        </div>
      )}
      {!isLoading && !!data?.data?.length && (
        <BookingTableListing data={data?.data} />
      )}
    </div>
  );
};

export default BookingListing;
