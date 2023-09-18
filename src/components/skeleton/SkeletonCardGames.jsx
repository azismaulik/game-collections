import React from "react";

const SkeletonCardGames = ({ cards }) => {
  return Array(cards)
    .fill(0)
    .map((item, i) => (
      <div
        key={i}
        className="flex-1 h-auto rounded-lg bg-neutral-900 animate-pulse"
      >
        <div className="w-full rounded-t-lg h-[200px] bg-neutral-800 animate-pulse"></div>
        <div className="p-4 pb-10">
          <div className="flex justify-between my-4 items-center gap-4">
            <div className="w-[65%] h-8 bg-neutral-800 animate-pulse rounded"></div>
            <div className="w-8 h-8 bg-neutral-800 animate-pulse rounded"></div>
          </div>
          <div className="w-full h-8 rounded bg-neutral-800"></div>
          <div className="flex justify-between items-center mt-4 mb-2">
            <div className="w-[40%] h-4 rounded bg-neutral-800"></div>
            <div className="w-[25%] h-4 rounded bg-neutral-800"></div>
          </div>
          <div className="w-full border-b border-neutral-800"></div>
          <div className="flex justify-between items-center mt-4 mb-2">
            <div className="w-[25%] h-4 rounded bg-neutral-800"></div>
            <div className="w-[40%] h-4 rounded bg-neutral-800"></div>
          </div>
          <div className="w-full border-b border-neutral-800"></div>
        </div>
      </div>
    ));
};

export default SkeletonCardGames;
