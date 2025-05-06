import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const PaginationLeftButton = ({ page, setPage, previous, next }) => {
    const handleSwitchPage = (newPage) => {
        if (newPage >= 1 && (next || previous)) {
            setPage(newPage);
        }
    };

    return (
        <div className='absolute left-0 z-20 top-1/2'>
            <button
                onClick={() => handleSwitchPage(page - 1)}
                disabled={!previous}
                className={`rounded-full border ${!previous ? "opacity-80 cursor-not-allowed" : "hover:bg-gray-200"}`}
            >
                <ChevronLeft size={30} />
            </button>
        </div>

    );
};

export default PaginationLeftButton;
