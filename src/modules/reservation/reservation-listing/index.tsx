import { useQuery } from "@tanstack/react-query";
import { getReservations } from "../../../services/api/booking-api";
import HueSpinner from "../../../components/loaders/hue-spinner";
import ReservationTableListing from "./table-listing";

const ReservationListing = () => {
    const { isLoading, data } = useQuery({
        queryKey: ["get-reservation"],
        queryFn: getReservations,
      });
      return (
        <div>
          {isLoading && (
            <div className="place-center py-12 lg:py-24">
              <HueSpinner size={1.3} />
            </div>
          )}
          {!isLoading && !!data?.data?.length && (
            <ReservationTableListing data={data?.data} />
          )}
        </div>
      );
}

export default ReservationListing