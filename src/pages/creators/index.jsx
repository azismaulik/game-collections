import SkeletonCardCreator from "@/components/skeleton/SkeletonCardCreator";
import React from "react";

import dynamic from "next/dynamic";
import { apiCall } from "@/services/api";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
import Pagination from "@/components/Pagination";
const CardBrowse = dynamic(() => import("@/components/CardBrowse"));

const Creators = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [creators, setCreators] = React.useState([]);

  const currentPage = Number(searchParams.get("page")) || 1;

  const [isLoading, setIsLoading] = React.useState(false);
  const [isLastPage, setIsLastPage] = React.useState(false);

  const fetchCreators = async () => {
    try {
      setIsLoading(true);
      const res = await apiCall({
        base: "creators",
        resource: `page=${currentPage}&page_size=20`,
      });
      setIsLastPage(res.next === null);
      setCreators(res.results);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangePage = (newPage) => {
    router.push({
      pathname: router.pathname,
      query: { page: newPage },
    });
  };

  React.useEffect(() => {
    fetchCreators();
  }, [currentPage]);

  return (
    <div>
      <h1 className="text-4xl md:text-6xl font-bold mb-6 md:mb-12">Creators</h1>
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
          <Pagination
            currentPage={currentPage}
            handleNextPage={() => handleChangePage(currentPage + 1)}
            handlePrevPage={() => handleChangePage(currentPage - 1)}
          />
        )}
        {isLoading && <span className="loader"></span>}
      </div>
    </div>
  );
};

export default Creators;
