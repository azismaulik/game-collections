import React from "react";
import dynamic from "next/dynamic";
import LoadMore from "@/components/LoadMore";
import SkeletonCardBrowse from "@/components/skeleton/SkeletonCardBrowse";
import { apiCall } from "@/services/api";
const CardBrowse = dynamic(() => import("@/components/CardBrowse"));

const Developers = () => {
  const [developers, setDevelopers] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isLastPage, setIsLastPage] = React.useState(false);

  const getDevelopers = async () => {
    try {
      setIsLoading(true);
      const response = await apiCall({
        base: "developers",
        resource: `page=${page}&page_size=20`,
      });
      response.next === null ? setIsLastPage(true) : setIsLastPage(false);
      setDevelopers([...developers, ...response.results]);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    getDevelopers();
  }, [page]);

  return (
    <div>
      <h1 className="text-6xl font-bold mb-10">Developers</h1>
      {developers.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {developers.map((item) => (
            <CardBrowse pathname="/developers" key={item.id} {...item} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <SkeletonCardBrowse cards={12} />
        </div>
      )}
      <div className="flex justify-center my-10">
        {isLoading && <span className="loader"></span>}
        {!isLastPage && !isLoading && (
          <LoadMore setPage={() => setPage(page + 1)} />
        )}
      </div>
    </div>
  );
};

export default Developers;
