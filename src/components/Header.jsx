import { useRouter } from "next/router";
import React from "react";
import MenuMobile from "./MenuMobile";

const Header = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div className="w-full flex gap-4 items-center mb-4 md:mb-10">
      <div
        onClick={() => router.push("/games/search")}
        className="w-full rounded-full bg-neutral-800 hover:bg-neutral-700 transition cursor-text p-4 px-6"
      >
        <h1 className="text-neutral-400">Search Games...</h1>
      </div>
      <div className="xl:hidden" onClick={() => setIsOpen(!isOpen)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-8 h-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </div>
      {isOpen && <MenuMobile clicked={() => setIsOpen(!isOpen)} />}
    </div>
  );
};

export default Header;
