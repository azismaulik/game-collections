import CardGames from "@/components/CardGames";
import SkeletonCardGames from "@/components/skeleton/SkeletonCardGames";
import { apiKey, apiUrl } from "@/constants";
import { useRouter } from "next/router";

const GenrePage = ({ games, error }) => {
  const router = useRouter();
  const { genre } = router.query;

  if (error) {
    return <div>Error: {error.message}</div>;
  }

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
    </div>
  );
};

export async function getServerSideProps({ params }) {
  const { genre } = params;

  try {
    // Lakukan permintaan ke API RAWG untuk mendapatkan data game berdasarkan genre
    const gamesResponse = await fetch(
      `${apiUrl}/games?key=${apiKey}&genres=${genre}`
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

export default GenrePage;
