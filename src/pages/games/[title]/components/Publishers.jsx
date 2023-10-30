import Link from "next/link";
import React from "react";

const Publishers = ({ publishers }) => {
  return (
    <div>
      <h1 className="text-neutral-600 mb-2 font-bold">Publishers</h1>
      {publishers?.map((item, i) => (
        <Link
          key={i}
          href={`/publishers/${item.slug}` || ""}
          className="border-bottom text-neutral-200 hover:text-neutral-500 transition mr-1"
        >
          {item.name}
          {i !== publishers.length - 1 ? "," : ""}
        </Link>
      ))}
    </div>
  );
};

export default Publishers;
