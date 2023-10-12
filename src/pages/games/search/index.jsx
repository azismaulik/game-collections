import React from "react";
import { apiKey, apiUrl } from "@/constants";
import LoadMore from "@/components/LoadMore";

import dynamic from "next/dynamic";
const CardGames = dynamic(() => import("@/components/CardGames"));

export default function Search() {
  const [games, setGames] = React.useState([]);
  const [selected, setSelected] = React.useState("relevance");
  const [page, setPage] = React.useState(1);
  const [isLoadingPage, setIsLoadingPage] = React.useState(false);
  const [isLastPage, setIsLastPage] = React.useState(false);

  const [query, setQuery] = React.useState("");

  // PR: using useDebounce

  const getGames = async (e) => {
    try {
      e.preventDefault();
      setIsLoadingPage(true);
      const response = await fetch(
        `${apiUrl}/games?key=${apiKey}&page=${page}&search=${query}`
      );
      const data = await response.json();
      data.next === null ? setIsLastPage(true) : setIsLastPage(false);
      setGames([...games, ...data.results]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoadingPage(false);
    }
  };

  return (
    <div>
      <form onSubmit={getGames}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search Games..."
          className="w-full rounded-full bg-neutral-800 hover:bg-neutral-700 transition cursor-text p-4 px-6 mb-10 focus:outline-none"
          autoFocus
        />
      </form>
      <h1 className="text-6xl font-bold mb-12">Search Games</h1>
      {/* <div className="flex justify-between mt-6">
        <select
          className="rounded bg-neutral-800 py-1 px-3 capitalize"
          onChange={(e) => setSelected(e.target.value)}
          value={selected}
        >
          {orderBy.map((item) => (
            <option className="capitalize" key={item} value={item}>
              {item} {item === selected && "🔥"}
            </option>
          ))}
        </select>
      </div> */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {games.map((item) => (
          <CardGames key={item.id} {...item} />
        ))}
      </div>

      <div className="flex justify-center my-10">
        {isLoadingPage && <span className="loader"></span>}
        {!isLastPage && !isLoadingPage && Object.keys(games).length ? (
          <LoadMore setPage={() => setPage(page + 1)} />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
