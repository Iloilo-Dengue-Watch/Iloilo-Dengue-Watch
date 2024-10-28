import React, { useState } from "react";

export default function DropDownWeather({ handleSelect }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Last 30 days");
  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleOptionClick = (timeFrame) => {
    handleSelect(timeFrame); // Pass the selected time frame to the parent
    setSelectedOption(timeFrame); // Update the selected
    setDropdownOpen(false);   // Close dropdown after selection
  };

  return (
    <div className="relative inline-block text-left mt-4">
      <button
        onClick={toggleDropdown}
        className="text-sm font-medium text-white dark:text-gray-400 hover:text-gray-900 text-center inline-flex items-center border-gray-600 bg-opacity-50 bg-slate-400 hover:bg-opacity-20 rounded-lg p-6"
      >
        {selectedOption}
        <svg
          className={`w-2.5 ml-1 transition-transform duration-300 ${dropdownOpen ? 'rotate-0' : 'rotate-180'}`}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>
      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-44 bg-white divide-y divide-gray-100 rounded-lg shadow-lg z-10">
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
            <li>
              <button
                onClick={() => handleOptionClick("Last 7 days")}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Last 7 days
              </button>
            </li>
            <li>
              <button
                onClick={() => handleOptionClick("Last 14 days")}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Last 14 days
              </button>
            </li>
            <li>
              <button
                onClick={() => handleOptionClick("Last 30 days")}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Last 30 days
              </button>
            </li>
            <li>
              <button
                onClick={() => handleOptionClick("Last 6 months")}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Last 6 months
              </button>
            </li>
            <li>
              <button
                onClick={() => handleOptionClick("Last 12 months")}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Last 12 months
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}