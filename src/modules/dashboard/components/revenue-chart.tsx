import Chart from "react-apexcharts";
import { formatAsNgnMoney } from "../../../utils/formatHelp";
import { FC } from "react";

interface Props {
  chart: { data: number[]; months: string[] } | undefined;
}
const TotalRevenueChart: FC<Props> = ({ chart }) => {
  const options = {
    colors: ["#4987BD", "#318174"],
    legend: {
      show: true,
    },
    tooltip: {
      theme: "dark",
      marker: {
        show: true,
      },
      style: {
        fontSize: "12px",
        color: "#0000",
        fontFamily: undefined,
      },
    },
    grid: {
      show: false,
    },
    stroke: {
      show: true,
      curve: "smooth",
      lineCap: "butt",
      width: 3,
    },
    dataLabels: {
      enabled: false,
    },
    yaxis: {
      labels: {
        show: true,
        style: {
          colors: "#A3A3A3",
          fontSize: "12px",
          cssClass: "apexcharts-xaxis-label",
        },
        formatter: (val) => `${formatAsNgnMoney(val)}`,
      },
    },
    xaxis: {
      labels: {
        show: true,
        style: {
          colors: "#A3A3A3",
          fontSize: "12px",
          cssClass: "apexcharts-xaxis-label",
        },
      },
      categories: chart?.months,
    },
  } as ApexCharts.ApexOptions;
  const series = [
    {
      name: "Revenue",
      data: chart?.data? chart.data : [],
    },
  ];

  return (
    <div className="">
      <div className="mt-6 lg:mt-8">
        {typeof window !== "undefined" && (
          <Chart
            options={options}
            series={series}
            type="line"
            width="100%"
            height="350px"
          />
        )}
      </div>
    </div>
  );
};

export default TotalRevenueChart;
