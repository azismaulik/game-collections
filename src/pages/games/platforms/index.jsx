import React from "react";
import SkeletonCardBrowse from "@/components/skeleton/SkeletonCardBrowse";
import dynamic from "next/dynamic";
import { apiCall } from "@/services/api";

const CardBrowse = dynamic(() => import("@/components/CardBrowse"));

const Platforms = () => {
  const [platforms, setPlatforms] = React.useState([]);

  React.useEffect(() => {
    const fetchPlatforms = async () => {
      try {
        const res = await apiCall({
          base: "platforms",
        });
        setPlatforms(res.results);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPlatforms();
  }, []);

  return (
    <div>
      <h1 className="text-4xl md:text-6xl font-bold mb-6 md:mb-12">
        Platforms
      </h1>
      {platforms.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {platforms.map((item) => (
            <CardBrowse pathname="/games/platforms" key={item.id} {...item} />
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

export default Platforms;
