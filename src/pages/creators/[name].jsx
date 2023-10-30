import React from "react";
import { useRouter } from "next/router";

import CardGames from "@/components/CardGames";
import LoadMore from "@/components/LoadMore";
import SkeletonCardGames from "@/components/skeleton/SkeletonCardGames";
import { apiCall } from "@/services/api";

const NameCreator = () => {
  const router = useRouter();
  const { name } = router.query;

  const [games, setGames] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [isLoadingPage, setIsLoadingPage] = React.useState(false);
  const [isLastPage, setIsLastPage] = React.useState(false);

  const fetchGames = async () => {
    try {
      setIsLoadingPage(true);
      const response = await apiCall({
        base: "games",
        resource: `page=${page}&page_size=20&creators=${name}`,
      });
      response.next === null ? setIsLastPage(true) : setIsLastPage(false);
      setGames([...games, ...response.results]);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoadingPage(false);
    }
  };

  React.useEffect(() => {
    fetchGames();
  }, [page, name]);

  return (
    <div>
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
        {!isLastPage && !isLoadingPage && (
          <LoadMore setPage={() => setPage(page + 1)} />
        )}
        {isLoadingPage && <span className="loader"></span>}
      </div>
    </div>
  );
};

export default NameCreator;
