import { apiCall } from "@/services/api";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const Tags = ({ tags }) => {
  return (
    <div>
      <h1 className="text-neutral-600 mb-2 font-bold mt-6">Tags</h1>
      {tags?.map((item, i) => (
        <Link
          key={i}
          href={`/games/tags/${item.slug}` || ""}
          className="border-bottom text-neutral-200 hover:text-neutral-500 transition mr-1"
        >
          {item.name}
          {i !== tags?.length - 1 ? "," : ""}
        </Link>
      ))}
    </div>
  );
};

export default Tags;
