import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import BackButton from "../components/BackButton";
import HueSpinner from "../components/loaders/hue-spinner";
import BookingDetailsIndex from "../modules/booking/details";
import { getSingleBooking } from "../services/api/booking-api";

const BookingDetails = () => {
  const { id } = useParams();
  const { isLoading, data } = useQuery({
    queryKey: ["get-single-booking", id],
    queryFn: () => getSingleBooking(`${id}`),
  });
  return (
    <div>
      <div>
        <BackButton />
      </div>
      <div className="pt-5">
        {isLoading && (
          <div className="place-center py-12 lg:py-24">
            <HueSpinner size={1.3} />
          </div>
        )}
        {!isLoading && data && <BookingDetailsIndex data={data} />}
      </div>
    </div>
  );
};

export default BookingDetails;
