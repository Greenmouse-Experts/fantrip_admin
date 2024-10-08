import { FC } from "react";
import RevenueChart from "./components/revenue-chart";

interface Props{
  chart: {data: number[], months: string[]} | undefined
}
const RevenueAnalysis:FC<Props> = ({chart}) => {
  return (
    <div className="bg-[#F7F9FB] dark:bg-[#131313] p-6 rounded-[21px]">
      <div>
        <p className="fw-500 text-2xl syne">Total Revenue</p>
      </div>
      <div className="mt-3">
        <RevenueChart chart={chart}/>
      </div>
    </div>
  );
};

export default RevenueAnalysis;
