import CardReviews from "@/components/CardReviews";
import LoadMore from "@/components/LoadMore";
import Grid from "@/components/displayOptions/Grid";
import Single from "@/components/displayOptions/Single";
import { apiCall } from "@/services/api";
import React from "react";

const Reviews = () => {
  const [reviews, setReviews] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [isLoadingPage, setIsLoadingPage] = React.useState(false);
  const [isLastPage, setIsLastPage] = React.useState(false);

  const [display, setDisplay] = React.useState("grid");
  const fetchReviews = async () => {
    try {
      setIsLoadingPage(true);
      const response = await apiCall({
        base: "reviews",
        resource: `page=${page}&page_size=20`,
      });
      response.next === null ? setIsLastPage(true) : setIsLastPage(false);
      setReviews([...reviews, ...response.results]);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoadingPage(false);
    }
  };

  React.useEffect(() => {
    fetchReviews();
  }, [page]);

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-6xl font-bold mb-12">Reviews</h1>
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
          <LoadMore setPage={() => setPage(page + 1)} />
        )}
        {isLoadingPage && <span className="loader"></span>}
      </div>
    </div>
  );
};

export default Reviews;
