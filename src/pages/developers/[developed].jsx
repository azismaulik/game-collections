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

const Developed = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { developed } = router.query;

  const currentPage = Number(searchParams.get("page")) || 1;

  const [games, setGames] = React.useState([]);
  const [isLoadingPage, setIsLoadingPage] = React.useState(false);
  const [isLastPage, setIsLastPage] = React.useState(false);

  const [display, setDisplay] = React.useState("grid");

  const getGamesBydeveloped = async () => {
    try {
      setIsLoadingPage(true);
      const response = await apiCall({
        base: "games",
        resource: `page=${currentPage}&page_size=20&developers=${developed}`,
      });
      response.next === null ? setIsLastPage(true) : setIsLastPage(false);
      setGames(response.results);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoadingPage(false);
    }
  };

  const handleChangePage = (newPage) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page: newPage },
    });
  };

  React.useEffect(() => {
    getGamesBydeveloped();
  }, [currentPage, developed]);

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 md:mb-12">
          Games on {developed?.replace("-", " ")}
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
            currentPage={currentPage}
            handleNextPage={() => handleChangePage(currentPage + 1)}
            handlePrevPage={() => handleChangePage(currentPage - 1)}
          />
        )}
        {isLoadingPage && <span className="loader"></span>}
      </div>
    </div>
  );
};

export default Developed;
