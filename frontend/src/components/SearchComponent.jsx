import React from 'react'
import { Search } from 'lucide-react'
export default function SearchComponent({background, placeholder, fontSize, isRounded, width, height}) {
    return (
        <div className="relative flex items-center">
            <Search className={`absolute left-3 text-gray-400 w-${width} h-${height}`} />
                
            <input
                type="text"
                placeholder={placeholder}
                className={`${background} ${isRounded ? 'rounded-full' : ""} ${fontSize ? fontSize : ""}  py-2 pl-10 pr-4 w-96 focus:outline-none`}
            />
        </div>
    )
}
