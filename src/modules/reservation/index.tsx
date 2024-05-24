import PagesHeader from "../../components/PagesHeader";
import ReservationListing from "./reservation-listing";

const ReservationIndex = () => {
  return (
    <div>
      <div>
        <PagesHeader name="Stay Reservations" />
      </div>
      <div className="mt-4">
        <ReservationListing/>
      </div>
    </div>
  );
};

export default ReservationIndex;
