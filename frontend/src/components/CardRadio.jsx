import React from 'react';

export default function CardRadio({ gradientFrom, gradientTo, imageUrl, title, description }) {
  return (
    <div className="w-[20%] rounded-lg px-2"> 
      <div className={`h-[150px] bg-gradient-to-br ${gradientFrom} ${gradientTo} rounded-lg p-2 mb-2`}>
        <div className="flex items-center justify-center">
        </div>
      </div>
      <img src={imageUrl} alt={title} className="rounded-full w-16 h-16 mx-auto mb-2" />
      <h3 className="text-lg font-semibold text-center">{title}</h3>
      <p className="text-sm text-gray-400 text-center">{description}</p>
    </div>
  );
}