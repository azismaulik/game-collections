import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { apiCall } from "@/services/api";
import LoadMore from "@/components/LoadMore";
import Grid from "@/components/displayOptions/Grid";
import Single from "@/components/displayOptions/Single";
const CardGames = dynamic(() => import("@/components/CardGames"));

export default function Search() {
  const router = useRouter();
  const { search } = router.query;

  const [games, setGames] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [isLoadingPage, setIsLoadingPage] = React.useState(false);
  const [isLastPage, setIsLastPage] = React.useState(false);

  const [prevQuery, setPrevQuery] = React.useState("");
  const [query, setQuery] = React.useState("");

  const [display, setDisplay] = React.useState("grid");

  const getGames = async () => {
    try {
      setPrevQuery(search);
      setIsLoadingPage(true);
      const response = await apiCall({
        base: "games",
        resource: `page=${page}&page_size=20&search=${search}`,
      });
      response.next === null ? setIsLastPage(true) : setIsLastPage(false);

      if (prevQuery !== search) {
        setGames(response.results);
      } else {
        setGames([...games, ...response.results]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingPage(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    router.push({
      pathname: router.pathname,
      query: { search: query },
    });
  };

  useEffect(() => {
    if (router.isReady && router.query.search) {
      if (prevQuery !== search) {
        setPage(1);
        setPrevQuery(search);
      }
      getGames();
    }
  }, [router.isReady, search, page]);

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search Games..."
          className="w-full rounded-full bg-neutral-800 hover:bg-neutral-700 transition cursor-text p-4 px-6 mb-10 focus:outline-none"
          autoFocus
        />
      </form>
      <div className="flex justify-between items-center">
        <h1 className="text-6xl font-bold mb-12">Search Games</h1>
        {games.length ? (
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
        ) : null}
      </div>
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

      <div className="flex justify-center my-10">
        {isLoadingPage && <span className="loader"></span>}
        {!isLastPage && !isLoadingPage && games.length ? (
          <LoadMore setPage={() => setPage(page + 1)} />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
