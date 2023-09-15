import CardGames from "@/components/CardGames";
import { apiKey, apiUrl } from "@/constants";
import { useRouter } from "next/router";

const Platform = ({ games, error }) => {
  const router = useRouter();
  const { platform } = router.query;

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1 className="text-6xl font-bold">Games on {platform}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
        {games.map((item, i) => (
          <CardGames key={i} {...item} />
        ))}
      </div>
      {/* <div className="flex justify-center my-10">
        {isLoading && <span className="loader"></span>}
        {!isLastPage && !isLoading && (
          <LoadMore setPage={() => setPage(page + 1)} />
        )}
      </div> */}
    </div>
  );
};

export async function getServerSideProps({ params }) {
  const { platform } = params;

  try {
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
      `${apiUrl}/games?key=${apiKey}&platforms=${platformId}`
    );

    if (!gamesResponse.ok) {
      throw new Error("Failed to fetch game data");
    }

    const gamesData = await gamesResponse.json();

    return {
      props: {
        games: gamesData.results,
        error: null,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        games: [],
        error: { message: "Failed to fetch data" },
      },
    };
  }
}

export default Platform;
