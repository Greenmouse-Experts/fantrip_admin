import dayjs from "dayjs";
import { FC } from "react";
import Calendar from "react-calendar";

interface Props{
  from: string;
  to: string;
}
const Availability:FC<Props> = ({from, to}) => {
  const date = {
    from: dayjs(from).toDate(),
    to: dayjs(to).toDate()
  }
  return (
    <div className="pb-6 border-b border-[#D2D2D2]">
      <div>
        <p className="fw-600 lg:text-lg">Availability</p>
      </div>
      <div className="mt-6 flex">
        <div className="bg-[#FFEDF2] px-3 lg:px-6 fw-500 py-3">
          Calendar view of available dates for fan stay booking
        </div>
      </div>
      <div className="mt-12">
        <Calendar
          // value={[params.checkIn, params.checkOut]}
          className={"lg:w-[400px] overflow-hidden"}
          minDate={date.from}
          maxDate={date.to}
        />
      </div>
    </div>
  );
};

export default Availability;
