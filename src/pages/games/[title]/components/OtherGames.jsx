import { apiCall } from "@/services/api";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const OtherGames = () => {
  const router = useRouter();
  const { title } = router.query;
  const [gameSeries, setGameSeries] = React.useState([]);

  const fetchGameSeries = async () => {
    try {
      const response = await apiCall({
        base: `games/${title}/game-series`,
      });
      setGameSeries(response.results);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    fetchGameSeries();
  }, []);
  return (
    <>
      {gameSeries.length ? (
        <div>
          <h1 className="text-neutral-600 mb-2 font-bold mt-6">
            Other games in the series
          </h1>
          {gameSeries?.map((item, i) => (
            <Link
              key={i}
              href={`/games/${item.slug}` || ""}
              className="border-bottom text-neutral-200 hover:text-neutral-500 transition mr-1"
            >
              {item.name}
              {i !== gameSeries.length - 1 ? "," : ""}
            </Link>
          ))}
        </div>
      ) : null}
    </>
  );
};

export default OtherGames;
