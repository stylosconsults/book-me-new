import React, { useState } from "react";

export interface IPaginationProps {
  totalPages: number;
  currentPage?: number;
  handlePageChange?: (pageNumber: number) => void;
}

const Pagination: React.FC<IPaginationProps> = ({
  totalPages,
  currentPage,
  handlePageChange,
}) => {
  const [activePage, setActivePage] = useState(currentPage ?? 0);

  // Function to generate an array of page numbers to show in the pagination
  const generatePageNumbers = (): number[] => {
    const pageNumbersToShow: number[] = [];

    // Show all page numbers when there are less than 10 pages
    if (totalPages <= 10) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbersToShow.push(i);
      }
      return pageNumbersToShow;
    }

    // Show the first 3 pages
    for (let i = 1; i <= 3; i++) {
      pageNumbersToShow.push(i);
    }

    const middleStart = Math.max(activePage - 1, 4);
    const middleEnd = Math.min(activePage + 1, totalPages - 3);

    if (activePage > 4) {
      pageNumbersToShow.push(-1); // Representing the dots
    }

    // Show the center 3 pages
    for (let i = middleStart; i <= middleEnd; i++) {
      pageNumbersToShow.push(i);
    }

    if (activePage < totalPages - 3) {
      pageNumbersToShow.push(-1); // Representing the dots
    }

    // Show the last 3 pages
    for (let i = totalPages - 2; i <= totalPages; i++) {
      pageNumbersToShow.push(i);
    }

    return pageNumbersToShow;
  };

  const handlePageClick = (pageNumber: number): void => {
    if (pageNumber !== activePage) {
      setActivePage(pageNumber);
      handlePageChange?.(pageNumber); // Notify the parent component of the page change
    }
  };

  return (
    <div className="py-4">
      <ul className="flex space-x-2 justify-center">
        {/* Previous Button */}
        <li>
          <button
            className="bg-gray-300 hover:bg-gray-400 px-3 py-2 rounded-l"
            onClick={() => handlePageClick(activePage - 1)}
            disabled={activePage === 1}
          >
            Previous
          </button>
        </li>

        {/* Page Numbers */}
        {generatePageNumbers().map((page, index) => (
          <li key={index}>
            {page === -1 ? (
              <span className="px-3">...</span>
            ) : (
              <button
                className={`${
                  activePage === page ? "bg-blue-500 text-white" : "bg-gray-300"
                } hover:bg-blue-600 px-3 py-2 rounded`}
                onClick={() => handlePageClick(page)}
              >
                {page}
              </button>
            )}
          </li>
        ))}

        {/* Next Button */}
        <li>
          <button
            className="bg-gray-300 hover:bg-gray-400 px-3 py-2 rounded-r"
            onClick={() => handlePageClick(activePage + 1)}
            disabled={activePage === totalPages}
          >
            Next
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
