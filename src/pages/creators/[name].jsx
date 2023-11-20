import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import CardGames from "@/components/CardGames";
import SkeletonCardGames from "@/components/skeleton/SkeletonCardGames";
import { apiCall } from "@/services/api";
import Grid from "@/components/displayOptions/Grid";
import Single from "@/components/displayOptions/Single";
import { useSearchParams } from "next/navigation";
import Pagination from "@/components/Pagination";

const NameCreator = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { name } = router.query;

  const [games, setGames] = useState([]);

  const currentPage = Number(searchParams.get("page")) || 1;

  const [isLoadingPage, setIsLoadingPage] = useState(false);
  const [isLastPage, setIsLastPage] = useState(false);

  const [display, setDisplay] = useState("grid");

  const handleChangePage = (newPage) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page: newPage },
    });
  };

  useEffect(() => {
    const fetchGames = async () => {
      try {
        setIsLoadingPage(true);
        const response = await apiCall({
          base: "games",
          resource: `page=${currentPage}&page_size=20&creators=${name}`,
        });
        setIsLastPage(response.next === null);
        setGames(response.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoadingPage(false);
      }
    };
    fetchGames();
  }, [currentPage, name]);

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 md:mb-12">
          {name?.replace("-", " ")}
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

export default NameCreator;
