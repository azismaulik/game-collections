import { apiCall } from "@/services/api";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

const Foto = ({ image }) => {
  const router = useRouter();
  const { title } = router.query;
  const [fotos, setFotos] = React.useState([]);

  React.useEffect(() => {
    const getFoto = async () => {
      try {
        const response = await apiCall({
          base: `games/${title}/screenshots`,
          resource: "page_size=3",
        });
        setFotos(response.results);
      } catch (error) {
        console.log(error);
      }
    };
    getFoto();
  }, [title]);

  return (
    <>
      {fotos?.map((item, i) => (
        <div key={i} className="flex-1">
          <Image
            src={item.image}
            alt=""
            width={150}
            height={150}
            className="rounded w-full h-full aspect-video"
          />
        </div>
      ))}
      {image && (
        <div className="flex-1 bg-neutral-800 rounded relative flex flex-col justify-center items-center">
          <Image
            src={image}
            alt=""
            width={150}
            height={150}
            className="rounded w-full h-auto opacity-25 absolute top-0 right-0 bottom-0 left-0 aspect-video"
          />
          <p className="font-semibold text-sm text-neutral-300">...</p>
          <p className="font-semibold text-sm text-neutral-300">view all</p>
        </div>
      )}
    </>
  );
};

export default Foto;
