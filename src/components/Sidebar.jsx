import { browse, genres, platforms } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const Sidebar = () => {
  const { pathname } = useRouter();
  const [isShown, setIsShown] = React.useState(false);

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
        href="/games"
        className="text-xl font-bold text-neutral-100 hover:text-neutral-400 transition mt-4"
      >
        All Games
      </Link>
      <Link
        href="/reviews"
        className="text-xl font-bold text-neutral-100 hover:text-neutral-400 transition mt-4"
      >
        Reviews
      </Link>
      <Link
        href="/games/browse"
        className="text-xl font-bold text-neutral-100 hover:text-neutral-400 transition mt-4"
      >
        Browse
      </Link>
      {browse?.slice(0, isShown ? browse.length : 4).map((item) => (
        <Link
          href={`${item.slug}`}
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
            } group-hover:opacity-70 transition`}
          />
        </div>
        <span className="transition text-neutral-500">
          {isShown ? "Hide" : "Show all"}
        </span>
      </button>
      <Link href="/games/platforms" className="text-xl font-bold mt-4">
        Platforms
      </Link>
      {platforms.map((item) => (
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
      <Link href="/games/genres" className="text-xl font-bold mt-4">
        Genres
      </Link>
      <ul>
        {genres.map((item) => (
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
      </ul>
    </nav>
  );
};

export default Sidebar;
