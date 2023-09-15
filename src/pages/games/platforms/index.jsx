import CardBrowse from "@/components/CardBrowse";
import LoadMore from "@/components/LoadMore";
import { apiKey, apiUrl } from "@/constants";
import React from "react";

const Platforms = () => {
  const [platforms, setPlatforms] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isLastPage, setIsLastPage] = React.useState(false);

  const getPlatforms = async () => {
    setIsLoading(true);
    const response = await fetch(
      `${apiUrl}/platforms?key=${apiKey}&page=${page}`
    );
    const data = await response.json();
    data.next === null ? setIsLastPage(true) : setIsLastPage(false);
    setPlatforms([...platforms, ...data.results]);
    setIsLoading(false);
  };

  React.useEffect(() => {
    getPlatforms();
  }, [page]);

  return (
    <div>
      <h1 className="text-6xl font-bold">Platforms</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
        {platforms.map((item, i) => (
          <CardBrowse key={i} {...item} />
        ))}
      </div>
      <div className="flex justify-center my-10">
        {isLoading && <span className="loader"></span>}
        {!isLastPage && !isLoading && (
          <LoadMore setPage={() => setPage(page + 1)} />
        )}
      </div>
    </div>
  );
};

export default Platforms;
