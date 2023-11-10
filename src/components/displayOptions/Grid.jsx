import React from "react";

const Grid = ({ isSelected, onSelect }) => {
  const selected = isSelected ? true : false;
  return (
    <div
      onClick={onSelect}
      className={`${
        selected ? "opacity-100 bg-neutral-700" : "opacity-80 bg-neutral-800"
      } group w-[80px] h-[65px] rounded-sm p-2 grid grid-cols-3 xl:grid-cols-4 gap-1 place-items-center hover:opacity-100 cursor-pointer`}
    >
      <div className="w-full h-5 border border-neutral-400"></div>
      <div className="w-full h-5 border border-neutral-400"></div>
      <div className="w-full h-5 border border-neutral-400"></div>
      <div className="w-full h-5 border border-neutral-400"></div>
      <div className="w-full h-5 border border-neutral-400"></div>
      <div className="w-full h-5 border border-neutral-400"></div>
      <div className="w-full h-5 border border-neutral-400 hidden xl:block"></div>
      <div className="w-full h-5 border border-neutral-400 hidden xl:block"></div>
    </div>
  );
};

export default Grid;
