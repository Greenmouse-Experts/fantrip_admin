import { PiChartLineDown, PiChartLineUp } from "react-icons/pi";
import { formatNumber } from "../../utils/formatHelp";
import { FC } from "react";

interface Props {
  data: {
    newUsers: number | undefined;
    totalGuests: number | undefined;
    totalHosts: number | undefined;
    totalListings: number | undefined;
  };
}
const BoxAnalysis:FC<Props> = ({data:item}) => {
  const bgs: string[] = [
    "bg-[#9847FE]",
    "bg-[#FC819F]",
    "bg-[#121212]",
    "bg-orange-600",
  ];
  const data = [
    {
      name: "Listings",
      number: item?.totalListings || 0,
      rise: "+00.00%",
      up: true,
    },
    {
      name: "Guests",
      number: item?.totalGuests || 0,
      rise: "-0.00%",
      up: false,
    },
    {
      name: "New Users",
      number: item?.newUsers || 0,
      rise: "+15.02%",
      up: true,
    },
    {
      name: "Hosts",
      number: item?.totalHosts || 0,
      rise: "+6.02%",
      up: true,
    },
  ];
  return (
    <div>
      <div className="grid md:grid-cols-2 gap-6 lg:grid-cols-4">
        {data.map((item, index) => {
          const colorIndex = index % bgs.length;
          const color = bgs[colorIndex];
          return (
            <div
              className={`${color} text-white p-6 rounded-[21px]`}
              key={item.name}
            >
              <p>{item.name}</p>
              <div className="flex mt-6 items-center justify-between">
                <p className="fw-600 text-2xl">{formatNumber(item.number)}</p>
                <div className="flex gap-x-1 items-center">
                  {/* <p className="fs-500">{item.rise}</p> */}
                  {item.up ? <PiChartLineUp /> : <PiChartLineDown />}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BoxAnalysis;
