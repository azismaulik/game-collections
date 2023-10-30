import Link from "next/link";
import React from "react";

const Platforms = ({ platforms }) => {
  return (
    <div>
      <h1 className="text-neutral-600 mb-2 font-bold">Platforms</h1>
      {platforms?.map((item, i) => (
        <Link
          key={i}
          href={`/games/platforms/${item.platform.slug}` || ""}
          className="border-bottom text-neutral-200 hover:text-neutral-500 transition mr-1"
        >
          {item.platform.name}
          {i !== platforms.length - 1 ? "," : ""}
        </Link>
      ))}
    </div>
  );
};

export default Platforms;
