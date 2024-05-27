// src/ForecastReport.tsx
import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import customData from '../db.json';

Chart.register(...registerables);

const allData = customData.Sheet1;

const ForecastReport: React.FC = () => {
  const labels = ["Jan", "Feb", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const itemsPerPage = 3;

  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  // Function to calculate simple linear regression
  const linearRegression = (y: number[]) => {
    const n = y.length;
    const x = Array.from({ length: n }, (_, i) => i + 1);
    const sumX = x.reduce((a, b) => a + b, 0);
    const sumY = y.reduce((a, b) => a + b, 0);
    const sumXY = x.map((xi, idx) => xi * y[idx]).reduce((a, b) => a + b, 0);
    const sumXX = x.map((xi) => xi * xi).reduce((a, b) => a + b, 0);
    const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;
    return { slope, intercept };
  };

  const getForecast = (data: number[]) => {
    const { slope, intercept } = linearRegression(data);
    return data.map((_, i) => intercept + slope * (i + 1));
  };

  const filteredData = allData.filter(item =>
    item.Overhead.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const paginatedData = filteredData.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  const datasets = paginatedData.map((item) => {
    const actualData = [
      item.Jan, item.Feb, item.March, item.April, item.May, item.June,
      item.July, item.August, item.September, item.October, item.November, item.December
    ];
    

    return {
      label: `${item.Overhead} (Actual)`,
      data: actualData,
      backgroundColor: getRandomColor(0.2),
      borderColor: getRandomColor(1),
      borderWidth: 1,
      fill: false,
    };
  });

  const forecastDatasets = paginatedData.map((item) => {
    const actualData = [
      item.Jan, item.Feb, item.March, item.April, item.May, item.June,
      item.July, item.August, item.September, item.October, item.November, item.December
    ];
    const forecastData = getForecast(actualData);

    return {
      label: `${item.Overhead} (Forecast)`,
      data: forecastData,
      backgroundColor: getRandomColor(0.2),
      borderColor: getRandomColor(1),
      borderWidth: 1,
      borderDash: [5, 5],
      fill: false,
    };
  });

  const data = {
    labels,
    datasets: [...datasets, ...forecastDatasets]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Monthly Overhead Costs with Forecast'
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Forecast Report</h1>
      <div className="mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search Overhead Costs"
          className="border border-gray-300 rounded-md px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <Line data={data} options={options} />
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 0}
          className="px-3 py-1 border border-gray-300 rounded-md shadow-sm disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-sm">
          Page {currentPage + 1} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages - 1}
          className="px-3 py-1 border border-gray-300 rounded-md shadow-sm disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

const getRandomColor = (opacity: number) => {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

export default ForecastReport;
