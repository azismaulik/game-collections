import Image from "next/image";
import React from "react";

const LoadMore = ({ setPage }) => {
  return (
    <button
      onClick={setPage}
      className="flex items-center py-2 px-4 gap-3 bg-neutral-800 rounded-lg text-sm font-semibold hover:bg-neutral-900 transition"
    >
      <span>load more</span>
      <Image
        src="/arrowRight.svg"
        alt=""
        width={15}
        height={15}
        className="rotate-90"
      />
    </button>
  );
};

export default LoadMore;
