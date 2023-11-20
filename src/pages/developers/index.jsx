import React from "react";
import dynamic from "next/dynamic";
import SkeletonCardBrowse from "@/components/skeleton/SkeletonCardBrowse";
import { apiCall } from "@/services/api";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
import Pagination from "@/components/Pagination";
const CardBrowse = dynamic(() => import("@/components/CardBrowse"));

const Developers = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;

  const [developers, setDevelopers] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isLastPage, setIsLastPage] = React.useState(false);

  const handleChangePage = (newPage) => {
    router.push({
      pathname: router.pathname,
      query: { page: newPage },
    });
  };

  React.useEffect(() => {
    const getDevelopers = async () => {
      try {
        setIsLoading(true);
        const response = await apiCall({
          base: "developers",
          resource: `page=${currentPage}&page_size=20`,
        });
        setIsLastPage(response.next === null);
        setDevelopers(response.results);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    getDevelopers();
  }, [currentPage]);

  return (
    <div>
      <h1 className="text-4xl md:text-6xl font-bold mb-6 md:mb-12">
        Developers
      </h1>
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
          <Pagination
            currentPage={currentPage}
            handleNextPage={() => handleChangePage(currentPage + 1)}
            handlePrevPage={() => handleChangePage(currentPage - 1)}
          />
        )}
      </div>
    </div>
  );
};

export default Developers;
