import RevenueChart from "./components/revenue-chart";

const RevenueAnalysis = () => {
  return (
    <div className="bg-[#F7F9FB] dark:bg-[#131313] p-6 rounded-[21px]">
      <div>
        <p className="fw-500 text-2xl syne">Total Revenue</p>
      </div>
      <div className="mt-3">
        <RevenueChart />
      </div>
    </div>
  );
};

export default RevenueAnalysis;
