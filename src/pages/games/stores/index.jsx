import React from "react";
import dynamic from "next/dynamic";
import SkeletonCardBrowse from "@/components/skeleton/SkeletonCardBrowse";
import { apiCall } from "@/services/api";

const CardBrowse = dynamic(() => import("@/components/CardBrowse"));

const Stores = () => {
  const [stores, setStores] = React.useState([]);

  const getStores = async () => {
    try {
      const res = await apiCall({
        base: "stores",
      });
      setStores(res.results);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getStores();
  }, []);

  return (
    <div>
      <h1 className="text-6xl font-bold mb-10">Stores</h1>
      {stores.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {stores.map((item) => (
            <CardBrowse pathname="/games/stores" key={item.id} {...item} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <SkeletonCardBrowse cards={12} />
        </div>
      )}
    </div>
  );
};

export default Stores;
