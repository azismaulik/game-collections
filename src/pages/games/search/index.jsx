import React, { useEffect } from "react";
import { apiKey, apiUrl } from "@/constants";

import dynamic from "next/dynamic";
import { useRouter } from "next/router";
const CardGames = dynamic(() => import("@/components/CardGames"));

export default function Search() {
  const router = useRouter();

  const [games, setGames] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [isLoadingPage, setIsLoadingPage] = React.useState(false);
  const [isLastPage, setIsLastPage] = React.useState(false);

  const [query, setQuery] = React.useState("");

  const getGames = async (e) => {
    try {
      setIsLoadingPage(true);
      const response = await fetch(
        `${apiUrl}/games?key=${apiKey}&page=${page}&page_size=50&search=${router.query.search}`
      );
      const data = await response.json();
      data.next === null ? setIsLastPage(true) : setIsLastPage(false);
      setGames(data.results);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoadingPage(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    router.push({
      pathname: router.pathname,
      query: { search: query },
    });
  };

  useEffect(() => {
    if (router.isReady && router.query.search) {
      getGames();
    }
  }, [router.isReady, router.query.search]);

  return (
    <div>
      <form onSubmit={handleSearch}>
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {games.map((item) => (
          <CardGames key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
}
