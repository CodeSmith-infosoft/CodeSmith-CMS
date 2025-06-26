import { useEffect, useMemo, useState } from "react";
import ReactApexChart from "react-apexcharts";
import dayjs from "dayjs";
import { dashboardStatsType } from "@/types/dashboardTypes";

type SaleGraphPropType = {
  dashboardData: dashboardStatsType | null;
  filter: {
    startDate: null | Date;
    endDate: null | Date;
  };
};

const SalesGraph = ({ dashboardData, filter }: SaleGraphPropType) => {
  const [range, setRange] = useState<"today" | "week" | "month" | "custom">("today");

  useEffect(()=>{
    if (dashboardData?.customRange.length) {
        setRange("custom")
    } 
  },[dashboardData])
  
  const { categories, seriesData, maxValue } = useMemo(() => {
    const dataset = range === "custom"
      ? dashboardData?.customRange
      : range === "today"
      ? dashboardData?.today
      : range === "week"
      ? dashboardData?.lastWeek
      : dashboardData?.lastMonth;

    const categories =
      dataset?.map((item) => dayjs(item.date).format("DD MMM")) || [];
    const seriesData = dataset?.map((item) => item.transaction) || [];
    const maxValue = Math.max(...seriesData, 100); // fallback to 100 if all zero

    return { categories, seriesData, maxValue };
  }, [range, dashboardData]);

  const chartData = {
    series: [
      {
        name: "Sales",
        data: seriesData,
      },
    ],
    options: {
      chart: {
        type: "area" as const,
        height: 265,
        toolbar: { show: false },
      },
      colors: ["#FF0000"],
      stroke: {
        curve: "straight" as const,
        width: 2,
      },
      fill: {
        type: "gradient" as const,
        gradient: {
          shade: "light",
          gradientToColors: ["#fff5f5"],
          opacityFrom: 0.5,
          opacityTo: 0.05,
          stops: [0, 90, 100],
        },
      },
      dataLabels: {
        enabled: false,
      },
      tooltip: {
        y: {
          formatter: (val: number) => `₹${val.toFixed(2)}`,
        },
      },
      xaxis: {
        categories,
        tickAmount: Math.min(6, categories.length),
      },
      yaxis: {
        min: 0,
        max: Math.ceil((maxValue * 1.1) / 1000) * 1000, // buffer and round to nearest 1000
        tickAmount: 5,
      },
      grid: {
        borderColor: "#ccc",
        strokeDashArray: 4,
      },
    },
  };

  return (
    <section className="sales-graph">
      <div className="sales-graph-title d-flex justify-content-between mb-4">
        <h3 className="text-lg font-semibold">Sales Graph</h3>
        <div className="btn">
          {["today", "week", "month"].map((type) => (
            <button
              key={type}
              onClick={() => setRange(type as typeof range)}
              className={`px-3 py-1 ${
                range === type ? "bg-white border" : "text-black border-0"
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))} 
          {dashboardData?.customRange.length ? (
            <button className={`px-3 py-1 ${range === "custom" ? "bg-white border" : ""} `} onClick={() => setRange("custom")}>
              {filter.startDate
                ? new Date(filter.startDate).toLocaleDateString()
                : ""}{" "}
              -{" "}
              {filter.startDate
                ? new Date(filter.startDate).toLocaleDateString()
                : ""}
            </button>
          ) : (
            ""
          )}
        </div>
      </div>

      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="area"
        height={265}
      />
    </section>
  );
};

export default SalesGraph;
