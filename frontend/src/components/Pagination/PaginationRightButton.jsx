import React from 'react';
import { ChevronRight } from 'lucide-react';

const PaginationRightButton = ({ page, setPage, previous, next }) => {
    const handleSwitchPage = (newPage) => {
        if (newPage >= 1 && (next || previous)) {
            setPage(newPage);
        }
    };

    return (
        <div className='absolute right-0 z-20 top-1/2'>
            <button
                onClick={() => handleSwitchPage(page + 1)}
                disabled={!next}
                className={`rounded-full border ${!next ? "opacity-80 cursor-not-allowed" : "hover:bg-gray-200"}`}
            >
                <ChevronRight size={30} />
            </button>
        </div>
    );
};

export default PaginationRightButton;
