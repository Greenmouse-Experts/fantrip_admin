import BookingAnalytics from "./booking-analytics";
import BookingListing from "./booking-table";

const BookingIndex = () => {
  return (
    <div>
        <div>
          <BookingAnalytics />
        </div>
        <div className="mt-6">
          <BookingListing/>
        </div>
    </div>
  );
};

export default BookingIndex;
