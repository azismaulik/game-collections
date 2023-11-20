import React from "react";
import SkeletonCardGames from "@/components/skeleton/SkeletonCardGames";
import { useRouter } from "next/router";

import dynamic from "next/dynamic";
import { apiCall } from "@/services/api";
import Grid from "@/components/displayOptions/Grid";
import Single from "@/components/displayOptions/Single";
import { useSearchParams } from "next/navigation";
import Pagination from "@/components/Pagination";
const CardGames = dynamic(() => import("@/components/CardGames"));

const Genre = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { genre } = router.query;

  const currenPage = Number(searchParams.get("page")) || 1;
  const [games, setGames] = React.useState([]);
  const [isLoadingPage, setIsLoadingPage] = React.useState(false);
  const [isLastPage, setIsLastPage] = React.useState(false);

  const [display, setDisplay] = React.useState("grid");

  const handleChangePage = (newPage) => {
    router.push({
      pathname: router.pathname,
      query: { genre: genre, page: newPage },
    });
  };

  React.useEffect(() => {
    const fetchGames = async () => {
      try {
        setIsLoadingPage(true);
        const res = await apiCall({
          base: "games",
          resource: `page=${currenPage}&page_size=20&genres=${genre}`,
        });
        setIsLastPage(res.next === null);
        setGames(res.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoadingPage(false);
      }
    };
    fetchGames();
  }, [currenPage, genre]);

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 md:mb-12">
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
          <Pagination
            handleNextPage={() => handleChangePage(currenPage + 1)}
            handlePrevPage={() => handleChangePage(currenPage - 1)}
            currentPage={currenPage}
          />
        )}
        {isLoadingPage && <span className="loader"></span>}
      </div>
    </div>
  );
};

export default Genre;
