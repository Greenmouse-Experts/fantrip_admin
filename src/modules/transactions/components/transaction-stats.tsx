import cancel from "../../../assets/svg/cancel.svg";
import { useQuery } from "@tanstack/react-query";
import { getBookingStat } from "../../../services/api/booking-api";
import { TbTransactionDollar } from "react-icons/tb";
import { RiSecurePaymentFill } from "react-icons/ri";
import { FaCcStripe } from "react-icons/fa6";

const TransactionStats = () => {
  const { data } = useQuery({
    queryKey: ["get-booking-stat"],
    queryFn: getBookingStat,
  });

  const booking = [
    {
      name: "All Transactions",
      number: data?.pending || 0,
      img: (
        <div className="bg-[#CB3CFF] bg-opacity-20 text-[#CB3CFF] w-12 h-12 circle place-center">
          <TbTransactionDollar size={20} />
        </div>
      ),
    },
    {
      name: "Successful Payments",
      number: data?.checkIn || 0,
      img: (
        <div className="bg-[#FDB52A] bg-opacity-20 text-[#FDB52A] w-12 h-12 circle place-center">
          <RiSecurePaymentFill size={20} />
        </div>
      ),
    },
    {
      name: "Total Payout",
      number: data?.checkOut || 0,
      img: (
        <div className="bg-[#05C168] bg-opacity-20 text-[#05C168] w-12 h-12 circle place-center">
          <FaCcStripe size={20} />
        </div>
      ),
    },
    {
      name: "Failed Payments",
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

export default TransactionStats;
