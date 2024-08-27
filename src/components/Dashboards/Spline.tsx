import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
// import { useState } from "react"

interface SplineProps {
  type:
    | "line"
    | "area"
    | "bar"
    | "pie"
    | "donut"
    | "radialBar"
    | "scatter"
    | "bubble"
    | "heatmap"
    | "candlestick"
    | "boxPlot"
    | "radar"
    | "polarArea"
    | "rangeBar"
    | "rangeArea"
    | "treemap"
    | undefined;
  width: number;
  height: number;
  title: string;
  count?: number;
  action?: string;
  value: string;
}

export function Spline({ type, width, height, title, value, count, action }: SplineProps) {
  const options: ApexOptions = {
    chart: {
      height: height,
      width: width,
      type: type,
      toolbar: {
        show: false
      }
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      type: "datetime",
      categories: [
        "2018-09-19T00:00:00.000Z",
        "2018-09-19T01:30:00.000Z",
        "2018-09-19T02:30:00.000Z",
        "2018-09-19T03:30:00.000Z",
        "2018-09-19T04:30:00.000Z",
        "2018-09-19T05:30:00.000Z",
        "2018-09-19T06:30:00.000Z",
      ],
    },
    tooltip: {
      x: {
        format: "dd/MM/yy HH:mm",
      },
    },
    legend: {
      show: false,
    },
    colors: ["var(--blue-100)"],
    fill: {
      colors: ["var(--blue-100)"],
    //   type: 'gradient'
    gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0,
        // stops: [0, 100]
      }
    },
    markers: {
      colors: ["var(--blue-100)"],
    },
  };

  const series = [
    {
      name: "series1",
      data: [31, 40, 28, 51, 42, 109, 100],
    },
  ];

  return (
      <div className="d-flex flex-column align-items-start bg-white px-4 py-3 rounded border border-secondary mb-4">
    <span className="badge mx-3 text-uppercase" style={{ background: "var(--blue-50)" }}>{title}</span>
    <span className="fs-2 fw-normal mx-3" style={{ color: "var(--blue-100)" }}>{value}</span>
    {count && action && <small className="text-secondary mx-3">{count} pedidos <strong>{action}</strong></small>}
        <Chart options={options} series={series} {...options.chart} />
    </div>
  );
}
