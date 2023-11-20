import React from "react";
import { Browse, Genre, Platforms } from "./Sidebar";
import Link from "next/link";

const MenuMobile = ({ clicked }) => {
  return (
    <div className="flex flex-col fixed top-0 right-0 bottom-0 left-0 xl:hidden p-10 bg-neutral-900 z-20 overflow-scroll">
      <div className="absolute top-8 right-4" onClick={clicked}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-8 h-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div>
      <Link onClick={clicked} href="/" className="text-2xl font-bold">
        RAWR
      </Link>
      <Link
        onClick={clicked}
        href="/"
        className="text-xl font-bold text-neutral-100 hover:text-neutral-400 transition mt-8"
      >
        Home
      </Link>
      <Link
        onClick={clicked}
        href="/reviews"
        className="text-xl font-bold text-neutral-100 hover:text-neutral-400 transition mt-4"
      >
        Reviews
      </Link>
      <Browse clicked={clicked} />
      <Platforms clicked={clicked} />
      <Genre clicked={clicked} />
    </div>
  );
};

export default MenuMobile;
