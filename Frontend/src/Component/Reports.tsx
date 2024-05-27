// src/ProgressReport.tsx
import React from 'react';
import { Radar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import customData from '../db.json';
const allData=customData.Sheet1.slice(1,5);
Chart.register(...registerables);

const ProgressReport: React.FC = () => {
  const labels = ["Jan", "Feb", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const datasets = allData.map((item) => ({
    label: item.Overhead,
    data: [
      item.Jan, item.Feb, item.March, item.April, item.May, item.June,
      item.July, item.August, item.September, item.October, item.November, item.December
    ],
    backgroundColor: getRandomColor(0.2),
    borderColor: getRandomColor(1),
    borderWidth: 1,
  }));

  const data = {
    labels,
    datasets
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Monthly Overhead Costs Progress Report'
      }
    },
    scales: {
      r: {
        angleLines: {
          display: false
        },
        suggestedMin: 0,
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Radar data={data} options={options} />
    </div>
  );
};

const getRandomColor = (opacity: number) => {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

export default ProgressReport;
