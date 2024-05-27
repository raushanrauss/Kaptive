// src/components/SalesChart.js

import React, { useEffect, useState } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement, ArcElement } from 'chart.js';
import axios from 'axios';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement, ArcElement);

const SalesChart = ({  chartType }) => {
    const DataTable = () => {
        const [allData, setAllData] = useState([]);
      
        useEffect(() => {
          axios
            .get('http://localhost:3001/Sheet1')
            .then((res) => setAllData(res.data));
        }, []);
        const data=allData;
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Sales Data',
      },
    },
  };

  const chartComponents = {
    bar: Bar,
    line: Line,
    pie: Pie,
  };

  const ChartComponent = chartComponents[chartType];

  return <ChartComponent data={data} options={options} />;
};
}
export default SalesChart;

