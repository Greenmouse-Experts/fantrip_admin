import all from "../../../assets/svg/all.svg";
import active from "../../../assets/svg/active.svg";
import saved from "../../../assets/svg/saved.svg";
import cancel from "../../../assets/svg/cancel.svg";
import { useQuery } from "@tanstack/react-query";
import { getBookingStat } from "../../../services/api/booking-api";

const BookingAnalytics = () => {
  const { data } = useQuery({
    queryKey: ["get-booking-stat"],
    queryFn: getBookingStat,
  });
  const booking = [
    {
      name: "Pending Bookings",
      number: data?.pending || 0,
      img: <img src={all} alt="" />,
    },
    {
      name: "Checked In",
      number: data?.checkIn || 0,
      img: <img src={active} alt="" />,
    },
    {
      name: "Checked Out",
      number: data?.checkOut || 0,
      img: <img src={saved} alt="" />,
    },
    {
      name: "Cancelled Bookings",
      number: data?.cancelled || 0,
      img: <img src={cancel} alt="" />,
    },
  ];
  return (
    <div className="grid grid-cols-4 gap-5">
      {booking.map((item, i) => (
        <div
          key={i}
          className="border border-gray-200 dark:border-[#343B4F] flex gap-x-2 p-4 rounded-[8px]"
        >
          <div>{item.img}</div>
          <div>
            <p className="fw-500">{item.name}</p>
            <p className="fs-500 text-gray-600 dark:text-[#AEB9E1] mt-[1px]">
              {item.number}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookingAnalytics;
