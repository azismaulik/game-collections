import CardGames from "@/components/CardGames";
import LoadMore from "@/components/LoadMore";
import SkeletonCardGames from "@/components/skeleton/SkeletonCardGames";
import { apiKey, apiUrl } from "@/constants";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

const NameCreator = () => {
  const router = useRouter();
  const { name } = router.query;

  const [creator, setCreator] = React.useState({});
  const [games, setGames] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [isLoadingPage, setIsLoadingPage] = React.useState(false);
  const [isLastPage, setIsLastPage] = React.useState(false);

  const getDetail = async () => {
    try {
      const response = await fetch(`${apiUrl}/creators/${name}?key=${apiKey}`);
      const data = await response.json();
      setCreator(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getGamesByCreator = async () => {
    try {
      setIsLoadingPage(true);
      if (name) {
        const response = await fetch(
          `${apiUrl}/games?key=${apiKey}&creators=${name}&page=${page}`
        );
        const data = await response.json();
        data.next === null ? setIsLastPage(true) : setIsLastPage(false);
        setGames([...games, ...data.results]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingPage(false);
    }
  };

  React.useEffect(() => {
    getDetail();
    getGamesByCreator();
  }, [page, name]);

  return (
    <div>
      <div className="flex gap-4 items-center">
        <h1 className="text-6xl font-bold">{creator?.name}</h1>
        {creator?.image && (
          <Image
            src={creator?.image}
            alt=""
            width={300}
            height={300}
            className="w-24 h-24 rounded-full "
          />
        )}
      </div>
      <p className="font-semibold text-lg">
        {creator?.positions?.map((item, i) => (
          <span key={i}>
            {item.name} {i === creator?.positions?.length - 1 ? "" : ", "}
          </span>
        ))}
      </p>
      <div
        className="mt-4 mb-10"
        dangerouslySetInnerHTML={{ __html: creator?.description }}
      />

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

export default NameCreator;
