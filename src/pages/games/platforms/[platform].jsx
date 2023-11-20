import React from "react";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
import Pagination from "@/components/Pagination";
import SkeletonCardGames from "@/components/skeleton/SkeletonCardGames";
import dynamic from "next/dynamic";
import Grid from "@/components/displayOptions/Grid";
import Single from "@/components/displayOptions/Single";

const CardGames = dynamic(() => import("@/components/CardGames"));

const apiUrl = process.env.NEXT_PUBLIC_RAWG_API_URL;
const apiKey = process.env.NEXT_PUBLIC_RAWG_API_KEY;

const Platform = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { platform } = router.query;

  const currenPage = Number(searchParams.get("page")) || 1;

  const [games, setGames] = React.useState([]);
  const [isLoadingPage, setIsLoadingPage] = React.useState(false);
  const [isLastPage, setIsLastPage] = React.useState(false);

  const [display, setDisplay] = React.useState("grid");

  const getGamesByPlatform = async () => {
    try {
      setIsLoadingPage(true);
      const platformMappingsResponse = await fetch(
        `${apiUrl}/platforms?key=${apiKey}`
      );

      if (!platformMappingsResponse.ok) {
        throw new Error("Failed to fetch platform data");
      }

      const platformMappingsData = await platformMappingsResponse.json();

      // Buat pemetaan otomatis platform ke ID
      const platformMappings = platformMappingsData.results.reduce(
        (acc, platformData) => {
          acc[platformData.slug] = platformData.id;
          return acc;
        },
        {}
      );

      // Dapatkan ID platform dari pemetaan
      const platformId = platformMappings[platform];

      if (!platformId) {
        return {
          notFound: true, // Tampilkan 404 jika platform tidak ditemukan
        };
      }

      // Lakukan permintaan ke API RAWG untuk mendapatkan data game berdasarkan platform
      const gamesResponse = await fetch(
        `${apiUrl}/games?key=${apiKey}&platforms=${platformId}&page=${currenPage}`
      );

      if (!gamesResponse.ok) {
        throw new Error("Failed to fetch game data");
      }

      const gamesData = await gamesResponse.json();
      setIsLastPage(gamesData.next === null);
      setGames(gamesData.results);
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
    getGamesByPlatform();
  }, [currenPage, platform]);

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 md:mb-12">
          Games on {platform?.replace("-", " ")}
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
          {games.map((item, i) => (
            <CardGames key={i} {...item} />
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
            currentPage={currenPage}
            handlePrevPage={() => handleChangePage(currenPage - 1)}
            handleNextPage={() => handleChangePage(currenPage + 1)}
          />
        )}
        {isLoadingPage && <span className="loader"></span>}
      </div>
    </div>
  );
};

export default Platform;
