import { FC } from "react";
import BookingInformation from "./booking-information";
import PaymentInformation from "./payment-information";
import StayInformation from "./stay-information";
import { PaidBookingItem } from "../../../contracts/booking";

interface Props {
  data: PaidBookingItem;
}
const BookingDetailsIndex: FC<Props> = ({ data }) => {
  return (
    <div className="grid gap-5">
      <div>
        <BookingInformation
          no={data.number}
          time={data.createdDate}
          reservation={data.reservation}
        />
      </div>
      <div>
        <PaymentInformation
          currency={data.currency}
          service_fee={data.serviceFee}
          trx={data?.trx}
        />
      </div>
      <div>
        <StayInformation
          currency={data.currency}
          amount={data.pricePerNight}
          status={data.status}
        />
      </div>
    </div>
  );
};

export default BookingDetailsIndex;
