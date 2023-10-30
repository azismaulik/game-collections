import LoadMore from "@/components/LoadMore";
import SkeletonCardCreator from "@/components/skeleton/SkeletonCardCreator";
import React from "react";

import dynamic from "next/dynamic";
import { apiCall } from "@/services/api";
const CardBrowse = dynamic(() => import("@/components/CardBrowse"));

const Creators = () => {
  const [creators, setCreators] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isLastPage, setIsLastPage] = React.useState(false);

  const fetchCreators = async () => {
    try {
      setIsLoading(true);
      const res = await apiCall({
        base: "creators",
        resource: `page=${page}&page_size=20`,
      });
      res.next === null ? setIsLastPage(true) : setIsLastPage(false);
      setCreators([...creators, ...res.results]);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    fetchCreators();
  }, [page]);

  return (
    <div>
      <h1 className="text-6xl font-bold mb-10">Creators</h1>
      {creators.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {creators.map((item) => (
            <CardBrowse pathname="/creators" key={item.id} {...item} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <SkeletonCardCreator cards={12} />
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

export default Creators;
