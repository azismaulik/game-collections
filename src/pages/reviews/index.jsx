import CardReviews from "@/components/CardReviews";
import Pagination from "@/components/Pagination";
import Grid from "@/components/displayOptions/Grid";
import Single from "@/components/displayOptions/Single";
import { apiCall } from "@/services/api";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import React from "react";

const Reviews = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;

  const [reviews, setReviews] = React.useState([]);
  const [isLoadingPage, setIsLoadingPage] = React.useState(false);
  const [isLastPage, setIsLastPage] = React.useState(false);

  const [display, setDisplay] = React.useState("grid");

  const handleChangePage = (newPage) => {
    router.push({
      pathname: router.pathname,
      query: { page: newPage },
    });
  };

  React.useEffect(() => {
    const fetchReviews = async () => {
      try {
        setIsLoadingPage(true);
        const response = await apiCall({
          base: "reviews",
          resource: `page=${currentPage}&page_size=20`,
        });
        setIsLastPage(response.next === null);
        setReviews(response.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoadingPage(false);
      }
    };
    fetchReviews();
  }, [currentPage]);

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 md:mb-12">
          Reviews
        </h1>
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
      </div>
      <div
        className={`${
          display === "grid"
            ? "md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full"
            : "w-full md:w-[60%] xl:w-1/2 mx-auto"
        } grid grid-cols-1 gap-6`}
      >
        {reviews.map((item) => (
          <CardReviews key={item.id} {...item} />
        ))}
      </div>

      <div className="flex justify-center my-10">
        {!isLastPage && !isLoadingPage && (
          <Pagination
            currentPage={currentPage}
            handleNextPage={() => handleChangePage(currentPage + 1)}
            handlePrevPage={() => handleChangePage(currentPage - 1)}
          />
        )}
        {isLoadingPage && <span className="loader"></span>}
      </div>
    </div>
  );
};

export default Reviews;
