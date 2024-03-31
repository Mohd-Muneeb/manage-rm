"use client";

import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  registerables,
} from "chart.js";

ChartJS.register(...registerables);

const StackedBarChart = () => {
  return (
    <div className="border-grey-400 h-full rounded-xl border-[1px] border-solid">
      <div></div>
      <Bar
        options={{
          scales: {
            y: {
              ticks: {
                display: false,
              },
              grid: {
                drawOnChartArea: false,
                drawTicks: false,
                display: false,
              },
              beginAtZero: true,
            },
            x: {
              grid: {
                display: false,
              },
              stacked: true,
              position: "bottom",
            },
          },
          plugins: {
            legend: {
              display: false,
            },
          },
        }}
        data={{
          labels: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "aug",
            "sept",
            "oct",
            "nov",
          ],
          datasets: [
            {
              backgroundColor: "#12171D",
              borderColor: "#12171D",
              borderWidth: 1,
              barThickness: 12,
              borderRadius: 10,
              data: [65, 59, 80, 81, 56, 55, 40, 81, 56, 55, 40],
              borderSkipped: false,
            },
            {
              backgroundColor: "#F7F5F7",
              borderColor: "#F7F5F7",
              borderWidth: 0.5,
              barThickness: 12,
              borderRadius: 10,
              data: [-65, -59, -80, -81, -56, -55, -40, -81, -56, -55, -40],
              borderSkipped: false,
            },
          ],
        }}
      />
    </div>
  );
};

export default StackedBarChart;
