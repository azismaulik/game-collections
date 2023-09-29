import React from "react";
import LoadMore from "@/components/LoadMore";
import SkeletonCardGames from "@/components/skeleton/SkeletonCardGames";
import { apiKey, apiUrl } from "@/constants";
import { useRouter } from "next/router";

import dynamic from "next/dynamic";
const CardGames = dynamic(() => import("@/components/CardGames"));

const Platform = () => {
  const router = useRouter();
  const { platform } = router.query;

  const [page, setPage] = React.useState(1);
  const [games, setGames] = React.useState([]);
  const [isLoadingPage, setIsLoadingPage] = React.useState(false);
  const [isLastPage, setIsLastPage] = React.useState(false);

  const getGamesByPlatform = async () => {
    try {
      setIsLoadingPage(true);
      // Lakukan permintaan ke API RAWG untuk mendapatkan data platform
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
        `${apiUrl}/games?key=${apiKey}&platforms=${platformId}&page=${page}`
      );

      if (!gamesResponse.ok) {
        throw new Error("Failed to fetch game data");
      }

      const gamesData = await gamesResponse.json();
      gamesData.next === null ? setIsLastPage(true) : setIsLastPage(false);
      setGames([...games, ...gamesData.results]);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoadingPage(false);
    }
  };

  React.useEffect(() => {
    getGamesByPlatform();
  }, [page, platform]);

  return (
    <div>
      <h1 className="text-6xl font-bold mb-10">Games on {platform}</h1>
      {games.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {games.map((item, i) => (
            <CardGames key={i} {...item} />
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

export default Platform;
