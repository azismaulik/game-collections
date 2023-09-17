import React from "react";

const SkeletonCardBrowse = ({ cards }) => {
  return Array(cards)
    .fill(0)
    .map((item, i) => (
      <div
        key={i}
        className="flex-1 h-auto rounded-lg bg-neutral-900 animate-pulse p-6 pt-16 flex flex-col"
      >
        <div className="w-[60%] h-5 bg-neutral-800 animate-pulse rounded mx-auto"></div>
        <div className="flex justify-between mt-6">
          <div className="bg-neutral-800 animate-pulse rounded w-1/2 h-5"></div>
          <div className="bg-neutral-800 animate-pulse rounded w-[15%] h-5"></div>
          </div>

          <div className="flex flex-col gap-3 mt-4">
            <div className="flex justify-between">
              <div className="bg-neutral-800 animate-pulse rounded w-[65%] h-4"></div>
              <div className="bg-neutral-800 animate-pulse rounded w-[20%] h-4"></div>
            </div>
            <div className="flex justify-between">
              <div className="bg-neutral-800 animate-pulse rounded w-[65%] h-4"></div>
              <div className="bg-neutral-800 animate-pulse rounded w-[20%] h-4"></div>
            </div>
            <div className="flex justify-between">
              <div className="bg-neutral-800 animate-pulse rounded w-[65%] h-4"></div>
              <div className="bg-neutral-800 animate-pulse rounded w-[20%] h-4"></div>
            </div>
            <div className="flex justify-between">
              <div className="bg-neutral-800 animate-pulse rounded w-[65%] h-4"></div>
              <div className="bg-neutral-800 animate-pulse rounded w-[20%] h-4"></div>
            </div>
            <div className="flex justify-between">
              <div className="bg-neutral-800 animate-pulse rounded w-[65%] h-4"></div>
              <div className="bg-neutral-800 animate-pulse rounded w-[20%] h-4"></div>
            </div>
            <div className="flex justify-between">
              <div className="bg-neutral-800 animate-pulse rounded w-[65%] h-4"></div>
              <div className="bg-neutral-800 animate-pulse rounded w-[20%] h-4"></div>
            </div>
        </div>
      </div>
    ));
};

export default SkeletonCardBrowse;
