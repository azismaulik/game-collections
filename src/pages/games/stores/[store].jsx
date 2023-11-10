import React from "react";
import LoadMore from "@/components/LoadMore";
import SkeletonCardGames from "@/components/skeleton/SkeletonCardGames";
import { useRouter } from "next/router";

import dynamic from "next/dynamic";
import Grid from "@/components/displayOptions/Grid";
import Single from "@/components/displayOptions/Single";
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

  const [display, setDisplay] = React.useState("grid");

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
      <div className="flex justify-between items-center">
        <h1 className="text-6xl font-bold mb-12">
          Games on {store?.replace("-", " ")}
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

export default Store;
