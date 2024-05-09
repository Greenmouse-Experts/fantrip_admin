import Chart from "react-apexcharts";
import { formatAsNgnMoney } from "../../../utils/formatHelp";

const TotalRevenueChart = () => {
    const options = {
        colors: ["#4987BD", "#318174"],
        legend: {
          show: true,
        },
        tooltip:{
            theme: "dark",
            marker: {
                show: true,
              },
            style: {
                fontSize: '12px',
                color: '#0000',
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
                    colors: '#A3A3A3',
                    fontSize: '12px',
                    cssClass: 'apexcharts-xaxis-label',
                },
                formatter: (val) => `${formatAsNgnMoney(val)}`
              },
        },
        xaxis: {
            labels: {
                show: true,
                style: {
                    colors: '#A3A3A3',
                    fontSize: '12px',
                    cssClass: 'apexcharts-xaxis-label',
                },
              },
          categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        },
      } as ApexCharts.ApexOptions;
      const series = [
        {
          name: "Revenue",
          data: [5000, 2000, 15000, 11000, 5500, 3000, 12000, 11000, 8000, 7000, 15000, 10000,],
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
}

export default TotalRevenueChart