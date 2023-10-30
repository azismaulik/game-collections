import React from "react";
import Link from "next/link";

const Genres = ({ genres }) => {
  return (
    <div>
      <h1 className="text-neutral-600 mb-2 font-bold">Genres</h1>
      {genres?.map((item, i) => (
        <Link
          key={i}
          href={`/games/genres/${item.slug}` || ""}
          className="border-bottom text-neutral-200 hover:text-neutral-500 transition mr-1"
        >
          {item.name}
          {i !== genres.length - 1 ? "," : ""}
        </Link>
      ))}
    </div>
  );
};

export default Genres;
