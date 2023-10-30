import React from "react";
import LoadMore from "@/components/LoadMore";
import SkeletonCardGames from "@/components/skeleton/SkeletonCardGames";
import { useRouter } from "next/router";

import dynamic from "next/dynamic";
const CardGames = dynamic(() => import("@/components/CardGames"));

const apiUrl = process.env.NEXT_PUBLIC_RAWG_API_URL;
const apiKey = process.env.NEXT_PUBLIC_RAWG_API_KEY;

const Store = () => {
  const router = useRouter();
  const { store } = router.query;

  const [page, setPage] = React.useState(1);
  const [games, setGames] = React.useState([]);
  const [isLoadingPage, setIsLoadingPage] = React.useState(false);
  const [isLastPage, setIsLastPage] = React.useState(false);

  const getGamesByStore = async () => {
    try {
      setIsLoadingPage(true);
      // Lakukan permintaan ke API RAWG untuk mendapatkan data store
      const storeMappingsResponse = await fetch(
        `${apiUrl}/stores?key=${apiKey}`
      );

      if (!storeMappingsResponse.ok) {
        throw new Error("Failed to fetch store data");
      }

      const storeMappingsData = await storeMappingsResponse.json();

      // Buat pemetaan otomatis store ke ID
      const storeMappings = storeMappingsData.results.reduce(
        (acc, storeData) => {
          acc[storeData.slug] = storeData.id;
          return acc;
        },
        {}
      );

      // Dapatkan ID store dari pemetaan
      const storeId = storeMappings[store];

      if (!storeId) {
        return {
          notFound: true, // Tampilkan 404 jika store tidak ditemukan
        };
      }

      // Lakukan permintaan ke API RAWG untuk mendapatkan data game berdasarkan store
      const gamesResponse = await fetch(
        `${apiUrl}/games?key=${apiKey}&stores=${storeId}&page=${page}`
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
    getGamesByStore();
  }, [page]);

  return (
    <div>
      <h1 className="text-6xl font-bold mb-10">Games on {store}</h1>
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

export default Store;
