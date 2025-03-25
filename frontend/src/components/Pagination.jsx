import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ page, setPage, previous, next }) => {
    const handleSwitchPage = (newPage) => {
        if (newPage >= 1 && (next || previous)) {
            setPage(newPage);
        }
    };

    return (
        <div className="flex justify-center items-center gap-4 mt-6">
            <button
                onClick={() => handleSwitchPage(page - 1)}
                disabled={!previous}
                className={`p-2 rounded-full border ${!previous ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200"}`}
            >
                <ChevronLeft size={30} />
            </button>

            {/* <span className="text-lg font-semibold">Trang {page}</span> */}

            <button
                onClick={() => handleSwitchPage(page + 1)}
                disabled={!next}
                className={`p-2 rounded-full border ${!next ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200"}`}
            >
                <ChevronRight size={30} />
            </button>
        </div>
    );
};

export default Pagination;
