import { useRouter } from "next/router";
import React from "react";

const Header = () => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push("/games/search")}
      className="w-full rounded-full bg-neutral-800 hover:bg-neutral-700 transition cursor-text p-4 px-6 mb-4 md:mb-10"
    >
      <h1 className="text-neutral-400">Search Games...</h1>
    </div>
  );
};

export default Header;
