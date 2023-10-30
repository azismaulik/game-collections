import React from "react";
import Link from "next/link";
import { apiCall } from "@/services/api";
import { useRouter } from "next/router";

const WhereToBuy = () => {
  const router = useRouter();
  const { title } = router.query;

  const [stores, setStores] = React.useState([]);
  const [buy, setBuy] = React.useState([]);

  const getStoreBuy = async () => {
    try {
      const response = await apiCall({
        base: `games/${title}/stores`,
      });
      setBuy(response.results);
    } catch (error) {
      console.log(error);
    }
  };

  const getStores = async () => {
    try {
      const response = await apiCall({
        base: `stores`,
      });
      setStores(response.results);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getStoreBuy();
    getStores();
  }, [title]);

  return (
    <>
      {buy?.length ? (
        <div>
          <h1 className="mt-6 font-semibold text-neutral-500 text-lg">
            Where to buy
          </h1>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {buy?.map((item, i) => (
              <Link
                className="text-sm text-center p-2 rounded-lg bg-neutral-800 hover:bg-neutral-100 text-neutral-400 hover:text-neutral-800 transition"
                key={i}
                href={item.url}
                target="_blank"
              >
                {stores.map((store, i) => (
                  <span key={i}>
                    {item.store_id === store.id && store.name}
                  </span>
                ))}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default WhereToBuy;
