import React from "react";
import dynamic from "next/dynamic";
import LoadMore from "@/components/LoadMore";
import SkeletonCardBrowse from "@/components/skeleton/SkeletonCardBrowse";
import { apiCall } from "@/services/api";

const CardBrowse = dynamic(() => import("@/components/CardBrowse"));

const Publishers = () => {
  const [publishers, setPublishers] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isLastPage, setIsLastPage] = React.useState(false);

  const getPublishers = async () => {
    try {
      setIsLoading(true);
      const response = await apiCall({
        base: "publishers",
        resource: `page=${page}&page_size=20`,
      });
      response.next === null ? setIsLastPage(true) : setIsLastPage(false);
      setPublishers([...publishers, ...response.results]);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    getPublishers();
  }, [page]);

  return (
    <div>
      <h1 className="text-6xl font-bold mb-10">Publishers</h1>
      {publishers.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {publishers.map((item) => (
            <CardBrowse pathname="/publishers" key={item.id} {...item} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <SkeletonCardBrowse cards={12} />
        </div>
      )}
      <div className="flex justify-center my-10">
        {!isLastPage && !isLoading && (
          <LoadMore setPage={() => setPage(page + 1)} />
        )}
        {isLoading && <span className="loader"></span>}
      </div>
    </div>
  );
};

export default Publishers;
