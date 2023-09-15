import CardGames from "@/components/CardGames";
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
      <h1 className="text-6xl font-bold">Games on {genre}</h1>
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
