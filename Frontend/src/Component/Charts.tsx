
import { Bar } from "react-chartjs-2";
import customData from '../db.json';
import { useState } from "react";

const LargeDatasetChart = () => {
  const allData=customData.Sheet1;
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

 

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1); // Reset current page when search changes
  };

  const filteredData = allData.filter((entry) =>
    entry.Overhead.toLowerCase().includes(search.toLowerCase())
  );

  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePagination = (page) => {
    setCurrentPage(page);
  };

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const chartData = {
    labels: Object.keys(paginatedData[0] || {}).filter(
      (key) => key !== "Overhead"
    ),
    datasets: paginatedData.map((entry, index) => ({
      label: entry.Overhead,
      data: Object.values(entry).slice(1), // Skip the first value (Overhead)
      backgroundColor: `rgba(${(index * 30) % 255}, ${(index * 60) % 255}, 192, 0.6)`,
      borderColor: `rgba(${(index * 30) % 255}, ${(index * 60) % 255}, 192, 1)`,
      borderWidth: 1,
    })),
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Monthly Overhead Costs",
      },
    },
  };

  const visiblePageNumbers = Array.from(
    { length: Math.min(totalPages, 5) },
    (_, index) => index + 1
  );

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4 flex justify-center">
        <input
          type="text"
          placeholder="Search by Overhead"
          value={search}
          onChange={handleSearch}
          className="p-2 border rounded w-full max-w-md"
        />
      </div>
      <div className="mb-8">
        <Bar data={chartData} options={options} />
      </div>
      <div className="flex justify-center space-x-2">
        <button
          onClick={() => handlePagination(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 border rounded-l bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        {visiblePageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => handlePagination(number)}
            className={`px-4 py-2 border ${
              number === currentPage ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {number}
          </button>
        ))}
        <button
          onClick={() => handlePagination(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 border rounded-r bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default LargeDatasetChart;
