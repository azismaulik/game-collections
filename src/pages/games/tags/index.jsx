import CardBrowse from "@/components/CardBrowse";
import LoadMore from "@/components/LoadMore";
import SkeletonCardBrowse from "@/components/skeleton/SkeletonCardBrowse";
import { apiKey, apiUrl } from "@/constants";
import React from "react";

const Tags = () => {
  const [tags, setTags] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isLastPage, setIsLastPage] = React.useState(false);

  const getTags = async () => {
    setIsLoading(true);
    const response = await fetch(`${apiUrl}/tags?key=${apiKey}&page=${page}`);
    const data = await response.json();
    data.next === null ? setIsLastPage(true) : setIsLastPage(false);
    setTags([...tags, ...data.results]);
    setIsLoading(false);
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
            <CardBrowse key={item.id} {...item} />
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
