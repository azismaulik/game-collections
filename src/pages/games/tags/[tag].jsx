import LoadMore from "@/components/LoadMore";
import SkeletonCardGames from "@/components/skeleton/SkeletonCardGames";
import { apiKey, apiUrl } from "@/constants";
import { useRouter } from "next/router";
import React from "react";

import dynamic from "next/dynamic";
const CardGames = dynamic(() => import("@/components/CardGames"));

const Tag = () => {
  const router = useRouter();
  const { tag } = router.query;
  const [games, setGames] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [isLoadingPage, setIsLoadingPage] = React.useState(false);
  const [isLastPage, setIsLastPage] = React.useState(false);

  const getGameByTag = async () => {
    try {
      setIsLoadingPage(true);
      const response = await fetch(
        `${apiUrl}/games?key=${apiKey}&tags=${tag}&page=${page}`
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
    getGameByTag();
  }, [page]);

  return (
    <div>
      <h1 className="text-6xl font-bold mb-10">Games on {tag}</h1>
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
};

export default Tag;
