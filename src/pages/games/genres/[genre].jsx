import React from "react";
import LoadMore from "@/components/LoadMore";
import SkeletonCardGames from "@/components/skeleton/SkeletonCardGames";
import { useRouter } from "next/router";

import dynamic from "next/dynamic";
import { apiCall } from "@/services/api";
import Grid from "@/components/displayOptions/Grid";
import Single from "@/components/displayOptions/Single";
const CardGames = dynamic(() => import("@/components/CardGames"));

const Genre = () => {
  const router = useRouter();
  const { genre } = router.query;

  const [page, setPage] = React.useState(1);
  const [games, setGames] = React.useState([]);
  const [isLoadingPage, setIsLoadingPage] = React.useState(false);
  const [isLastPage, setIsLastPage] = React.useState(false);

  const [prevGenre, setPrevGenre] = React.useState("");
  const [display, setDisplay] = React.useState("grid");

  const fetchGames = async () => {
    try {
      setIsLoadingPage(true);
      setPrevGenre(genre);
      const res = await apiCall({
        base: "games",
        resource: `page=${page}&page_size=20&genres=${genre}`,
      });
      res.next === null ? setIsLastPage(true) : setIsLastPage(false);
      if (prevGenre !== genre) {
        setGames(res.results);
      } else {
        setGames([...games, ...res.results]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoadingPage(false);
    }
  };

  React.useEffect(() => {
    fetchGames();
  }, [page, genre]);

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-6xl font-bold mb-12">
          Games on {genre?.replace("-", " ")}
        </h1>
        <div className="hidden xl:flex gap-2 items-center">
          <p>Display options: </p>
          <Grid
            onSelect={() => setDisplay("grid")}
            isSelected={display === "grid" ? true : false}
          />
          <Single
            onSelect={() => setDisplay("single")}
            isSelected={display !== "grid" ? true : false}
          />
        </div>
      </div>
      {games.length ? (
        <div
          className={`${
            display === "grid"
              ? "md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full"
              : "w-full md:w-[60%] xl:w-1/2 mx-auto"
          } grid grid-cols-1 gap-6`}
        >
          {games.map((item) => (
            <CardGames key={item.id} {...item} />
          ))}
        </div>
      ) : (
        <div
          className={`${
            display === "grid"
              ? "md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full"
              : "w-full md:w-[60%] xl:w-1/2 mx-auto"
          } grid grid-cols-1 gap-6`}
        >
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

export default Genre;
