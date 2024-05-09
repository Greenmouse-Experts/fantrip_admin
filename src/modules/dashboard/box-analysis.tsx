import { PiChartLineDown, PiChartLineUp } from "react-icons/pi";
import { formatNumber } from "../../utils/formatHelp";

const BoxAnalysis = () => {
  const bgs: string[] = [
    "bg-[#9847FE]",
    "bg-[#FC819F]",
    "bg-[#121212]",
    "bg-orange-600",
  ];
  const data = [
    {
      name: "Listings",
      number: "7265",
      rise: "+11.02%",
      up: true,
    },
    {
      name: "Guests",
      number: "3617",
      rise: "-0.02%",
      up: false,
    },
    {
      name: "New Users",
      number: "156",
      rise: "+15.02%",
      up: true,
    },
    {
      name: "Hosts",
      number: "3145",
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
            <div className={`${color} text-white p-6 rounded-[21px]`} key={item.name}>
              <p>{item.name}</p>
              <div className="flex mt-6 items-center justify-between">
                <p className="fw-600 text-2xl">{formatNumber(item.number)}</p>
                <div className="flex gap-x-1 items-center">
                  <p className="fs-500">{item.rise}</p>
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
