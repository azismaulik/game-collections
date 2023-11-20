import { apiCall } from "@/services/api";
import { formatDate } from "@/utils/formatDate";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import TeamDevelopment from "./components/TeamDevelopment";
import Header from "./components/Header";
import OtherGames from "./components/OtherGames";
import Additions from "./components/Additions";
import Video from "./components/Video";
import Foto from "./components/Foto";
import WhereToBuy from "./components/WhereToBuy";
import Platforms from "./components/Platforms";
import Metacritic from "./components/Metacritic";
import Genres from "./components/Genres";
import ReleaseDate from "./components/ReleaseDate";
import Developers from "./components/Developers";
import Publishers from "./components/Publishers";
import Tags from "./components/Tags";

const Title = () => {
  const router = useRouter();
  const { title } = router.query;

  const [data, setData] = React.useState({});
  const [show, setShow] = React.useState(false);
  const [posts, setPosts] = React.useState([]);

  React.useEffect(() => {
    const getDetailGame = async () => {
      try {
        const response = await apiCall({
          base: `games/${title}`,
        });
        setData(response);
      } catch (error) {
        console.log(error);
      }
    };

    const getPosts = async () => {
      try {
        const response = await apiCall({
          base: `games/${title}/reddit`,
        });
        setPosts(response.results);
      } catch (error) {
        console.log(error);
      }
    };
    getDetailGame();
    getPosts();
  }, [title]);

  if (router.isFallback || typeof title === "undefined") {
    // Menampilkan loading spinner atau pesan lainnya saat dynamic route parameter belum tersedia
    return <span className="loader"></span>;
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
        <div className="flex-1 order-2 md:order-1 col-span-1 md:col-span-4">
          <Header data={data} />
          <h1 className="text-2xl font-bold mt-6 mb-3 border-bottom w-max">
            About
          </h1>
          <p
            className={`whitespace-pre-wrap text-sm ${
              show ? "line-clamp-none" : "line-clamp-6"
            }`}
          >
            {data.description_raw}
          </p>
          <p
            className={`px-2 rounded-lg pb-1 font-semibold text-xs w-max cursor-pointer transition mt-4 ${
              show
                ? "bg-neutral-800 text-neutral-100 hover:bg-neutral-100 hover:text-neutral-800"
                : "bg-neutral-100 text-neutral-800 hover:bg-neutral-800 hover:text-neutral-100"
            }`}
            onClick={() => setShow(!show)}
          >
            {show ? "read less" : "read more"}
          </p>
          <div className="my-6 grid grid-cols-2 gap-6">
            {data?.platforms && <Platforms platforms={data?.platforms} />}
            {data?.metacritic && <Metacritic meta={data?.metacritic} />}
            {data?.genres && <Genres genres={data?.genres} />}
            {data?.released && <ReleaseDate date={data?.released} />}
            {data?.developers && <Developers developers={data?.developers} />}
            {data?.publishers && <Publishers publishers={data?.publishers} />}
          </div>
          <OtherGames />
          <Additions />
          {data?.tags && <Tags tags={data?.tags} />}
        </div>
        <div className="flex-1 order-1 md:order-2 mt-4 col-span-1 md:col-span-2">
          <Video />
          <div className="grid grid-cols-2 gap-4">
            <Foto image={data?.background_image} />
          </div>
          <WhereToBuy />
        </div>
      </div>

      <TeamDevelopment name={data?.name} />

      {posts?.length ? (
        <div className="mt-8">
          <div className="flex gap-2 items-center">
            <h1 className="text-2xl font-bold text-neutral-100">
              {data?.name} posts{" "}
            </h1>
            <Image
              src="/reddit.png"
              alt=""
              width={50}
              height={50}
              className="w-auto h-auto"
            />
          </div>
          <div className="grid grid-cols-3 gap-4 py-4">
            {posts?.slice(0, 6).map((item, i) => (
              <div key={i}>
                <Link
                  href={item.url}
                  target="_blank"
                  className="text-lg font-bold hover:text-neutral-500 transition"
                >
                  {item.name}
                </Link>
                <p className="text-sm text-neutral-500 font-semibold mt-2">
                  {formatDate(item.created)} by{" "}
                  {item.username?.replace("/u/", "")}
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Title;
