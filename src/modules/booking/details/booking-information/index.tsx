import { FC } from "react";
import { ReservationItem } from "../../../../contracts/booking";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

interface Props {
  no: string;
  reservation: ReservationItem;
  time: string;
}
const BookingInformation: FC<Props> = ({ no, reservation, time }) => {
  return (
    <div>
        <div className="mb-2">
        <p className="text-lg lg:text-xl fw-600 syne flex gap-x-2 items-center">
          <span className="bg-pri block w-4 h-4"></span>Booking Info
        </p>
      </div>
      <div className="border rounded-xl p-5">
        <div className="flex gap-x-4">
          <div className="w-3/12 rounded">
            <img
              src={reservation?.stay?.photos[0]}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-9/12 grid gap-3 lg:grid-cols-2">
            <div className="">
              <p className="fw-500 opacity-75">Booking No:</p>
              <p className="fw-600 mt-2">{no}</p>
            </div>
            <div className="">
              <p className="fw-500 opacity-75">Booking Time:</p>
              <p className="fw-600 mt-2">
                {dayjs(time).format("MM:HH DD-MM-YYYY")}
              </p>
            </div>
            <div className="">
              <p className="fw-500 opacity-75">Guest:</p>
              <p className="fw-600 mt-2">
                {`${reservation?.guest?.firstName} ${reservation?.guest?.lastName}`}{" "}
                <Link
                  to={`/users/guest/${reservation?.guest?.id}`}
                  className="text-primary"
                >
                  View Details
                </Link>
              </p>
            </div>
            <div className="">
              <p className="fw-500 opacity-75">Host:</p>
              <p className="fw-600 mt-2">
                {`${reservation?.stay?.host?.firstName} ${reservation?.stay?.host?.lastName}`}{" "}
                <Link
                  to={`/users/host/${reservation?.stay.host?.id}`}
                  className="text-primary"
                >
                  View Details
                </Link>
              </p>
            </div>
            <div className="">
              <p className="fw-500 opacity-75">Guest Count:</p>
              <p className="fw-600 mt-2">{reservation.adults} Adults</p>
              <p className="fw-600 mt-1">{reservation.children} Children</p>
            </div>
            <div className="">
              <p className="fw-500 opacity-75">Location:</p>
              <p className="fw-600 mt-2">{reservation?.stay?.address}</p>
            </div>
            <div className="">
              <p className="fw-500 opacity-75">Check In:</p>
              <p className="fw-600 mt-2">{reservation.checkIn}</p>
            </div>
            <div className="">
              <p className="fw-500 opacity-75">Check Out:</p>
              <p className="fw-600 mt-2">{reservation.checkOut}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingInformation;
