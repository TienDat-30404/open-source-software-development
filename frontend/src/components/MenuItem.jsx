import { useEffect, useRef } from "react";
export default function MenuItem({ icon, text, handleClick, clickOutside = () => {} }) {
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        clickOutside();
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [clickOutside]);

  return (
    <div
      ref={menuRef}
      onClick={(e) => {
        e.stopPropagation(); 
        handleClick && handleClick();
      }} 
      className="flex items-center px-4 py-2 hover:bg-[#3E3E3E] cursor-pointer"
    >
      <span className="mr-3 ">{icon}</span>
      <span className="flex-1 text-sm">{text}</span>
    </div>
  );
}