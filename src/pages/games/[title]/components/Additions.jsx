import { apiCall } from "@/services/api";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const Additions = () => {
  const router = useRouter();
  const { title } = router.query;
  const [additions, setAdditions] = React.useState([]);

  const getAdditions = async () => {
    try {
      const response = await apiCall({
        base: `games/${title}/additions`,
      });
      setAdditions(response.results);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getAdditions();
  }, []);
  return (
    <>
      {additions?.length ? (
        <div>
          <h1 className="text-neutral-600 mb-2 font-bold mt-6">
            DLC's and editions
          </h1>
          {additions?.map((item, i) => (
            <Link
              key={i}
              href={`/games/${item.slug}` || ""}
              className="border-bottom text-neutral-200 hover:text-neutral-500 transition mr-1"
            >
              {item.name}
              {i !== additions.length - 1 ? "," : ""}
            </Link>
          ))}
        </div>
      ) : null}
    </>
  );
};

export default Additions;
