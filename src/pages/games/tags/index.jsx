import React from "react";
import dynamic from "next/dynamic";
import LoadMore from "@/components/LoadMore";
import SkeletonCardBrowse from "@/components/skeleton/SkeletonCardBrowse";
import { apiCall } from "@/services/api";
const CardBrowse = dynamic(() => import("@/components/CardBrowse"));

const Tags = () => {
  const [tags, setTags] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isLastPage, setIsLastPage] = React.useState(false);

  const getTags = async () => {
    try {
      setIsLoading(true);
      const response = await apiCall({
        base: "tags",
        resource: `page=${page}&page_size=20`,
      });
      response.next === null ? setIsLastPage(true) : setIsLastPage(false);
      setTags([...tags, ...response.results]);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    getTags();
  }, [page]);

  return (
    <div>
      <h1 className="text-6xl font-bold mb-10">Tags</h1>
      {tags.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {tags.map((item) => (
            <CardBrowse pathname="/games/tags" key={item.id} {...item} />
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

export default Tags;
