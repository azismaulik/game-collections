import { browse, genres, platforms } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

const Sidebar = () => {
  return (
    <nav className="hidden min-w-[250px] sticky max-h-screen overflow-auto top-0 bottom-0 xl:flex flex-col p-6">
      <Link href="/" className="text-2xl font-bold">
        RAWR
      </Link>
      <Link
        href="/"
        className="text-xl font-bold text-neutral-100 hover:text-neutral-400 transition mt-8"
      >
        Home
      </Link>
      <Link
        href="/reviews"
        className="text-xl font-bold text-neutral-100 hover:text-neutral-400 transition mt-4"
      >
        Reviews
      </Link>
      <Browse />
      <Platforms />
      <Genre />
    </nav>
  );
};

const Browse = () => {
  const { pathname } = useRouter();
  const [isShown, setIsShown] = useState(false);
  return (
    <>
      <Link
        href="/games/browse"
        className="text-xl font-bold text-neutral-100 hover:text-neutral-400 transition mt-4"
      >
        Browse
      </Link>
      {browse?.slice(0, isShown ? browse.length : 3).map((item) => (
        <Link
          href={`${item.slug}`}
          className="mt-2 font-semibold flex gap-2 items-center group"
          key={item.slug}
        >
          <div
            className={`${
              pathname.includes(item.slug) ? "bg-neutral-600" : "bg-neutral-800"
            } flex justify-center items-center p-2 rounded group-hover:bg-neutral-600 transition-opacity duration-500`}
          >
            <Image
              src={item.icon}
              alt={item.name}
              width={20}
              height={20}
              className="w-6 h-6"
            />
          </div>
          <p
            className={`${
              pathname.includes(item.slug) ? "text-white" : "text-neutral-200"
            } group-hover:text-white transition`}
          >
            {item.name}
          </p>
        </Link>
      ))}
      <button
        className="mt-2 flex gap-2 items-center font-semibold group"
        onClick={() => setIsShown(!isShown)}
      >
        <div
          className={`${
            isShown ? "bg-neutral-600" : "bg-neutral-800"
          } flex justify-center items-center p-2 rounded bg-neutral-800 group-hover:bg-neutral-600 group-focus:bg-neutral-800 transition`}
        >
          <Image
            src="/arrowRight.svg"
            alt="show"
            width={15}
            height={15}
            priority
            className={`w-6 h-6 ${
              !isShown ? "rotate-90" : "-rotate-90"
            } group-hover:opacity-70 transition-all duration-500`}
          />
        </div>
        <span className="transition text-neutral-500">
          {isShown ? "Hide" : "Show all"}
        </span>
      </button>
    </>
  );
};

const Platforms = () => {
  const { pathname } = useRouter();
  const [isShown, setIsShown] = useState(false);
  return (
    <>
      <Link href="/games/platforms" className="text-xl font-bold mt-4">
        Platforms
      </Link>
      {platforms.slice(0, isShown ? platforms.length : 3).map((item) => (
        <Link
          href={`/games/platforms/${item.slug}`}
          className="mt-2 font-semibold flex gap-2 items-center group"
          key={item.slug}
        >
          <div
            className={`${
              pathname.includes(item.slug) ? "bg-neutral-600" : "bg-neutral-800"
            } flex justify-center items-center p-2 rounded group-hover:bg-neutral-600 transition`}
          >
            <Image
              src={item.icon}
              alt={item.name}
              width={20}
              height={20}
              className="w-6 h-6"
            />
          </div>
          <p
            className={`${
              pathname.includes(item.slug) ? "text-white" : "text-neutral-200"
            } group-hover:text-white transition`}
          >
            {item.name}
          </p>
        </Link>
      ))}
      <button
        className="mt-2 flex gap-2 items-center font-semibold group"
        onClick={() => setIsShown(!isShown)}
      >
        <div
          className={`${
            isShown ? "bg-neutral-600" : "bg-neutral-800"
          } flex justify-center items-center p-2 rounded bg-neutral-800 group-hover:bg-neutral-600 group-focus:bg-neutral-800 transition`}
        >
          <Image
            src="/arrowRight.svg"
            alt="show"
            width={15}
            height={15}
            priority
            className={`w-6 h-6 ${
              !isShown ? "rotate-90" : "-rotate-90"
            } group-hover:opacity-70 transition-all duration-500`}
          />
        </div>
        <span className="transition text-neutral-500">
          {isShown ? "Hide" : "Show all"}
        </span>
      </button>
    </>
  );
};

const Genre = () => {
  const { pathname } = useRouter();
  const [isShown, setIsShown] = useState(false);
  return (
    <>
      <Link href="/games/genres" className="text-xl font-bold mt-4">
        Genres
      </Link>
      <ul>
        {genres.slice(0, isShown ? genres.length : 3).map((item) => (
          <li key={item.slug}>
            <Link
              href={`/games/genres/${item.slug}`}
              className="mt-2 flex gap-2 items-center font-semibold group"
            >
              <Image
                src={item.icon}
                alt={item.name}
                width={50}
                height={50}
                priority
                className="w-10 h-10 rounded group-hover:opacity-70"
              />
              <span
                className={`${
                  pathname.includes(item.slug)
                    ? "text-white"
                    : "text-neutral-200"
                } group-hover:text-white transition`}
              >
                {item.name}
              </span>
            </Link>
          </li>
        ))}
        <button
          className="mt-2 flex gap-2 items-center font-semibold group"
          onClick={() => setIsShown(!isShown)}
        >
          <div
            className={`${
              isShown ? "bg-neutral-600" : "bg-neutral-800"
            } flex justify-center items-center p-2 rounded bg-neutral-800 group-hover:bg-neutral-600 group-focus:bg-neutral-800 transition`}
          >
            <Image
              src="/arrowRight.svg"
              alt="show"
              width={15}
              height={15}
              priority
              className={`w-6 h-6 ${
                !isShown ? "rotate-90" : "-rotate-90"
              } group-hover:opacity-70 transition-all duration-500`}
            />
          </div>
          <span className="transition-shadow text-neutral-500">
            {isShown ? "Hide" : "Show all"}
          </span>
        </button>
      </ul>
    </>
  );
};

export default Sidebar;
