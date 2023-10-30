import React from "react";
import Link from "next/link";

const Developers = ({ developers }) => {
  return (
    <div>
      <h1 className="text-neutral-600 mb-2 font-bold">Developers</h1>
      {developers?.map((item, i) => (
        <Link
          key={i}
          href={`/developers/${item.slug}` || ""}
          className="border-bottom text-neutral-200 hover:text-neutral-500 transition mr-1"
        >
          {item.name}
          {i !== developers.length - 1 ? "," : ""}
        </Link>
      ))}
    </div>
  );
};

export default Developers;
