import React from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import LoadMore from "@/components/LoadMore";
import SkeletonCardGames from "@/components/skeleton/SkeletonCardGames";
import { apiCall } from "@/services/api";
import Grid from "@/components/displayOptions/Grid";
import Single from "@/components/displayOptions/Single";

const CardGames = dynamic(() => import("@/components/CardGames"));

const Tag = () => {
  const router = useRouter();
  const { tag } = router.query;
  const [games, setGames] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [isLoadingPage, setIsLoadingPage] = React.useState(false);
  const [isLastPage, setIsLastPage] = React.useState(false);

  const [display, setDisplay] = React.useState("grid");

  const getGameByTag = async () => {
    try {
      setIsLoadingPage(true);
      const response = await apiCall({
        base: "games",
        resource: `page=${page}&page_size=20&tags=${tag}`,
      });
      response.next === null ? setIsLastPage(true) : setIsLastPage(false);
      setGames([...games, ...response.results]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoadingPage(false);
    }
  };

  React.useEffect(() => {
    getGameByTag();
  }, [page, tag]);

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-6xl font-bold mb-12">
          Games on {tag?.replace("-", " ")}
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

export default Tag;
