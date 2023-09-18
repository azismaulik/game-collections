import React from "react";
import { apiKey, apiUrl } from "@/constants";
import dynamic from "next/dynamic";
import SkeletonCardGames from "@/components/skeleton/SkeletonCardGames";

const CardGames = dynamic(() => import("@/components/CardGames"));
import LoadMore from "@/components/LoadMore";

export default function Games() {
  const [games, setGames] = React.useState([]);
  const [selected, setSelected] = React.useState("relevance");
  const [page, setPage] = React.useState(1);
  const [isLoadingPage, setIsLoadingPage] = React.useState(false);
  const [isLastPage, setIsLastPage] = React.useState(false);

  const getGames = async () => {
    try {
      setIsLoadingPage(true);
      const response = await fetch(
        `${apiUrl}/games?key=${apiKey}&page=${page}`
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

  React.useEffect(() => {
    getGames();
  }, [selected, page]);

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
