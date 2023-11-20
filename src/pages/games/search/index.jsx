import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { apiCall } from "@/services/api";
import Grid from "@/components/displayOptions/Grid";
import Single from "@/components/displayOptions/Single";
import { useSearchParams } from "next/navigation";
import Pagination from "@/components/Pagination";
import MenuMobile from "@/components/MenuMobile";
const CardGames = dynamic(() => import("@/components/CardGames"));

export default function Search() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;

  const { search } = router.query;

  const [games, setGames] = React.useState([]);
  const [isLoadingPage, setIsLoadingPage] = React.useState(false);
  const [isLastPage, setIsLastPage] = React.useState(false);

  const [prevQuery, setPrevQuery] = React.useState("");
  const [query, setQuery] = React.useState("");

  const [display, setDisplay] = React.useState("grid");

  const [isOpen, setIsOpen] = React.useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    router.push({
      pathname: router.pathname,
      query: { search: query },
    });
  };

  const handleChangePage = useCallback(
    (newPage) => {
      router.push({
        pathname: router.pathname,
        query: { ...router.query, page: newPage },
      });
    },
    [router]
  );

  useEffect(() => {
    if (router.isReady && router.query.search) {
      if (prevQuery !== search) {
        handleChangePage(1);
        setPrevQuery(search);
      }
      const getGames = async () => {
        try {
          setPrevQuery(search);
          setIsLoadingPage(true);
          const response = await apiCall({
            base: "games",
            resource: `page=${currentPage}&page_size=20&search=${search}`,
          });
          setIsLastPage(response.next === null);
          setGames(response.results);
        } catch (error) {
          console.log(error);
        } finally {
          setIsLoadingPage(false);
        }
      };
      getGames();
    }
  }, [
    router.isReady,
    router.query.search,
    search,
    currentPage,
    handleChangePage,
    prevQuery,
  ]);

  return (
    <div className="w-full">
      <div className="w-full flex justify-between items-center gap-4 mb-4 md:mb-10">
        <form className="w-full" onSubmit={handleSearch}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Games..."
            className="w-full rounded-full bg-neutral-800 hover:bg-neutral-700 transition cursor-text p-4 px-6 focus:outline-none"
            autoFocus
          />
        </form>
        <div className="xl:hidden" onClick={() => setIsOpen(!isOpen)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </div>
      </div>
      {isOpen && <MenuMobile clicked={() => setIsOpen(!isOpen)} />}
      <div className="flex justify-between items-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 md:mb-12">
          Search Games
        </h1>
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
          <Pagination
            currentPage={currentPage}
            handleNextPage={() => handleChangePage(currentPage + 1)}
            handlePrevPage={() => handleChangePage(currentPage - 1)}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
