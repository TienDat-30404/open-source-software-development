import React from 'react'

export default function Pagination({ totalPage, handlePagination, page, visiblePagination }) {
    return (
        <div className="flex justify-center mt-4">
            <ul className="flex space-x-1">
                {/* Previous Button */}
                <li>
                    <button
                        onClick={() => handlePagination(page - 1)}
                        disabled={page === 1}
                        className={`px-3 py-1 rounded border text-sm ${
                            page === 1
                                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                : 'bg-white text-gray-700 hover:bg-gray-100'
                        }`}
                    >
                        Previous
                    </button>
                </li>

                {/* Page Numbers */}
                {visiblePagination(page, totalPage).map((pageNumber) => (
                    <li key={pageNumber}>
                        <button
                            onClick={() => handlePagination(pageNumber)}
                            className={`px-3 py-1 rounded border text-sm ${
                                page === pageNumber
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-white text-gray-700 hover:bg-gray-100'
                            }`}
                        >
                            {pageNumber}
                        </button>
                    </li>
                ))}

                {/* Next Button */}
                <li>
                    <button
                        onClick={() => handlePagination(page + 1)}
                        disabled={page === totalPage}
                        className={`px-3 py-1 rounded border text-sm ${
                            page === totalPage
                                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                : 'bg-white text-gray-700 hover:bg-gray-100'
                        }`}
                    >
                        Next
                    </button>
                </li>
            </ul>
        </div>
    )
}
