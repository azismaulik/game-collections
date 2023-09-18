import React from "react";
import LoadMore from "@/components/LoadMore";
import SkeletonCardGames from "@/components/skeleton/SkeletonCardGames";
import { apiKey, apiUrl } from "@/constants";
import { useRouter } from "next/router";

import dynamic from "next/dynamic";
const CardGames = dynamic(() => import("@/components/CardGames"));

const Genre = () => {
  const router = useRouter();
  const { genre } = router.query;

  const [page, setPage] = React.useState(1);
  const [games, setGames] = React.useState([]);
  const [isLoadingPage, setIsLoadingPage] = React.useState(false);
  const [isLastPage, setIsLastPage] = React.useState(false);

  const getGamesByGenre = async () => {
    try {
      setIsLoadingPage(true);
      // Lakukan permintaan ke API RAWG untuk mendapatkan data genre
      const genreMappingsResponse = await fetch(
        `${apiUrl}/genres?key=${apiKey}`
      );

      if (!genreMappingsResponse.ok) {
        throw new Error("Failed to fetch genre data");
      }

      const genreMappingsData = await genreMappingsResponse.json();

      // Buat pemetaan otomatis genre ke ID
      const genreMappings = genreMappingsData.results.reduce(
        (acc, genreData) => {
          acc[genreData.slug] = genreData.id;
          return acc;
        },
        {}
      );

      // Dapatkan ID genre dari pemetaan
      const genreId = genreMappings[genre];

      if (!genreId) {
        return {
          notFound: true, // Tampilkan 404 jika genre tidak ditemukan
        };
      }

      // Lakukan permintaan ke API RAWG untuk mendapatkan data game berdasarkan genre
      const gamesResponse = await fetch(
        `${apiUrl}/games?key=${apiKey}&genres=${genreId}&page=${page}`
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
    getGamesByGenre();
  }, [page]);

  return (
    <div>
      <h1 className="text-6xl font-bold mb-10">Games on {genre}</h1>
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
        {!isLastPage && !isLoadingPage ? (
          <LoadMore setPage={() => setPage(page + 1)} />
        ) : (
          <span className="loader"></span>
        )}
      </div>
    </div>
  );
};

export default Genre;
