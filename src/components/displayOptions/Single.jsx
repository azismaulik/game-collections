import React from "react";

const Single = ({ isSelected, onSelect }) => {
  const selected = isSelected ? true : false;
  return (
    <div
      onClick={onSelect}
      className={`${
        selected ? "opacity-100 bg-neutral-700" : "opacity-80 bg-neutral-800"
      } group w-[80px] h-[65px] rounded px-2 hover:opacity-100 cursor-pointer flex flex-col justify-center items-center overflow-hidden relative`}
    >
      <div className="w-[70%] h-8 border border-neutral-400 rounded absolute -top-5"></div>
      <div className="w-[70%] h-8 border border-neutral-400 rounded absolute"></div>
      <div className="w-[70%] h-8 border border-neutral-400 rounded absolute -bottom-5"></div>
    </div>
  );
};

export default Single;
