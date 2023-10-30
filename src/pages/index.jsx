import React from "react";
import LoadMore from "@/components/LoadMore";
import SkeletonCardGames from "@/components/skeleton/SkeletonCardGames";

import dynamic from "next/dynamic";
import { apiCall } from "@/services/api";
const CardGames = dynamic(() => import("@/components/CardGames"));

export default function Home() {
  const [games, setGames] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [isLoadingPage, setIsLoadingPage] = React.useState(false);
  const [isLastPage, setIsLastPage] = React.useState(false);

  const fetchGames = async () => {
    setIsLoadingPage(true);
    const res = await apiCall({
      base: "games",
      resource: `page=${page}&page_size=20`,
    });
    res.next === null ? setIsLastPage(true) : setIsLastPage(false);
    setGames([...games, ...res.results]);
    setIsLoadingPage(false);
  };

  React.useEffect(() => {
    fetchGames();
  }, [page]);

  return (
    <div>
      <h1 className="text-6xl font-bold mb-12">New and trending</h1>
      {games.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {games.map((item) => (
            <CardGames key={item.id} {...item} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <SkeletonCardGames cards={12} />
        </div>
      )}

      <div className="flex justify-center my-10">
        {!isLastPage && !isLoadingPage ? (
          <LoadMore setPage={() => setPage(page + 1)} />
        ) : (
          <span className="loader"></span>
        )}
      </div>
    </div>
  );
}
