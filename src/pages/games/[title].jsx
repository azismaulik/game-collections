import CardBrowse from "@/components/CardBrowse";
import { apiKey, apiUrl } from "@/constants";
import { formatDate } from "@/utils/formatDate";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const pc = "/platforms/pc.svg";
const playstation = "/platforms/playstation.svg";
const xbox = "/platforms/xbox.svg";
const nintendo = "/platforms/nintendo.svg";
const ios = "/platforms/ios.svg";
const android = "/platforms/android.svg";
const mac = "/platforms/mac.svg";
const linux = "/platforms/linux.svg";
const web = "/platforms/web.svg";

const Title = () => {
  const router = useRouter();
  const { title } = router.query;
  const [data, setData] = React.useState({});
  const [video, setVideo] = React.useState("");
  const [fotos, setFotos] = React.useState([]);
  const [stores, setStores] = React.useState([]);
  const [buy, setBuy] = React.useState([]);
  const [show, setShow] = React.useState(false);
  const [show2, setShow2] = React.useState(false);
  const [gameSeries, setGameSeries] = React.useState([]);
  const [additions, setAdditions] = React.useState([]);
  const [team, setTeam] = React.useState([]);
  const [posts, setPosts] = React.useState([]);

  const getDetailGame = async () => {
    try {
      const response = await fetch(`${apiUrl}/games/${title}?key=${apiKey}`);
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getVideos = async () => {
    try {
      const response = await fetch(
        `${apiUrl}/games/${title}/movies?key=${apiKey}`
      );
      const data = await response.json();
      setVideo(data.results[0]?.data?.max);
    } catch (error) {
      console.log(error);
    }
  };

  const getFoto = async () => {
    try {
      const response = await fetch(
        `${apiUrl}/games/${title}/screenshots?key=${apiKey}`
      );
      const data = await response.json();
      setFotos(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const getStores = async () => {
    try {
      const response = await fetch(`${apiUrl}/stores?key=${apiKey}`);
      const data = await response.json();
      setStores(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const getStoreBuy = async () => {
    try {
      const response = await fetch(
        `${apiUrl}/games/${title}/stores?key=${apiKey}`
      );
      const data = await response.json();
      setBuy(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const getGameSeries = async () => {
    try {
      const response = await fetch(
        `${apiUrl}/games/${title}/game-series?key=${apiKey}`
      );
      const data = await response.json();
      setGameSeries(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const getAdditions = async () => {
    try {
      const response = await fetch(
        `${apiUrl}/games/${title}/additions?key=${apiKey}`
      );
      const data = await response.json();
      setAdditions(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const getTeam = async () => {
    try {
      const response = await fetch(
        `${apiUrl}/games/${title}/development-team?key=${apiKey}`
      );
      const data = await response.json();
      setTeam(data.results);
    } catch (error) {
      console.log(error);
    }
  };
  const getPosts = async () => {
    try {
      const response = await fetch(
        `${apiUrl}/games/${title}/reddit?key=${apiKey}`
      );
      const data = await response.json();
      setPosts(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getDetailGame();
    getFoto();
    getVideos();
    getStores();
    getStoreBuy();
    getGameSeries();
    getAdditions();
    getTeam();
    getPosts();
  }, [title]);

  return (
    <div>
      <div className="flex justify-center md:justify-start gap-1 text-xs uppercase mb-6">
        <Link href="/">Home</Link>
        <span>/</span>
        <Link href="/games">Games</Link>
        <span>/</span>
        <p>{data.name}</p>
      </div>
      <div className="flex justify-center md:justify-start flex-wrap gap-2 items-center">
        <div className="text-black px-2 rounded-lg bg-white text-sm font-semibold">
          {formatDate(data.released)}
        </div>
        <div className="flex gap-2 items-center my-4">
          {data.parent_platforms?.map((item, i) => (
            <Image
              key={i}
              src={
                item.platform.slug === "pc"
                  ? pc
                  : item.platform.slug === "playstation"
                  ? playstation
                  : item.platform.slug === "xbox"
                  ? xbox
                  : item.platform.slug === "nintendo"
                  ? nintendo
                  : item.platform.slug === "ios"
                  ? ios
                  : item.platform.slug === "android"
                  ? android
                  : item.platform.slug === "mac"
                  ? mac
                  : item.platform.slug === "linux"
                  ? linux
                  : item.platform.slug === "web"
                  ? web
                  : ""
              }
              width={20}
              height={20}
              alt=""
              className="w-5 h-5"
            />
          ))}
        </div>
        <p className="text-sm uppercase">
          Average playtime: {data?.playtime} hours
        </p>
      </div>
      <h1 className="text-center md:text-start text-4xl md:text-6xl font-bold">
        {data?.name}
      </h1>
      <div className="flex flex-wrap gap-[5%]">
        <div className="w-full md:w-[65%] order-2 md:order-1">
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
            {data?.platforms?.length ? (
              <div>
                <h1 className="text-neutral-600 mb-2 font-bold">Platforms</h1>
                {data?.platforms?.map((item, i) => (
                  <Link
                    key={i}
                    href={`/games/platforms/${item.platform.slug}` || ""}
                    className="border-bottom text-neutral-200 hover:text-neutral-500 transition mr-1"
                  >
                    {item.platform.name}
                    {i !== data.platforms.length - 1 ? "," : ""}
                  </Link>
                ))}
              </div>
            ) : (
              ""
            )}
            {data?.metacritic ? (
              <div>
                <h1 className="text-neutral-600 mb-2 font-bold">Metascore</h1>
                <div className="text-green-500 font-bold border border-green-500 py-1 px-2 rounded w-max">
                  <span>{data.metacritic}</span>
                </div>
              </div>
            ) : (
              ""
            )}
            {data?.genres?.length ? (
              <div>
                <h1 className="text-neutral-600 mb-2 font-bold">Genres</h1>
                {data?.genres?.map((item, i) => (
                  <Link
                    key={i}
                    href={`/games/genres/${item.slug}` || ""}
                    className="border-bottom text-neutral-200 hover:text-neutral-500 transition mr-1"
                  >
                    {item.name}
                    {i !== data?.genres.length - 1 ? "," : ""}
                  </Link>
                ))}
              </div>
            ) : (
              ""
            )}
            {data?.released ? (
              <div>
                <h1 className="text-neutral-600 mb-2 font-bold">
                  Release date
                </h1>
                <p className="font-semibold text-neutral-200">
                  {formatDate(data.released)}
                </p>
              </div>
            ) : (
              ""
            )}
            {data?.developers?.length ? (
              <div>
                <h1 className="text-neutral-600 mb-2 font-bold">Developers</h1>
                {data?.developers?.map((item, i) => (
                  <Link
                    key={i}
                    href={`/developers/${item.slug}` || ""}
                    className="border-bottom text-neutral-200 hover:text-neutral-500 transition mr-1"
                  >
                    {item.name}
                    {i !== data?.developers.length - 1 ? "," : ""}
                  </Link>
                ))}
              </div>
            ) : (
              ""
            )}
            {data?.publishers?.length ? (
              <div>
                <h1 className="text-neutral-600 mb-2 font-bold">Publishers</h1>
                {data?.publishers?.map((item, i) => (
                  <Link
                    key={i}
                    href={`/publishers/${item.slug}` || ""}
                    className="border-bottom text-neutral-200 hover:text-neutral-500 transition mr-1"
                  >
                    {item.name}
                    {i !== data?.publishers.length - 1 ? "," : ""}
                  </Link>
                ))}
              </div>
            ) : (
              ""
            )}
          </div>
          {gameSeries?.length ? (
            <div>
              <h1 className="text-neutral-600 mb-2 font-bold mt-6">
                Other games in the series
              </h1>
              {gameSeries?.map((item, i) => (
                <Link
                  key={i}
                  href={`/games/${item.slug}` || ""}
                  className="border-bottom text-neutral-200 hover:text-neutral-500 transition mr-1"
                >
                  {item.name}
                  {i !== gameSeries.length - 1 ? "," : ""}
                </Link>
              ))}
            </div>
          ) : (
            ""
          )}
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
          ) : (
            ""
          )}
          {data?.tags?.length ? (
            <div>
              <h1 className="text-neutral-600 mb-2 font-bold mt-6">Tags</h1>
              {data?.tags?.map((item, i) => (
                <Link
                  key={i}
                  href={`/games/tags/${item.slug}` || ""}
                  className="border-bottom text-neutral-200 hover:text-neutral-500 transition mr-1"
                >
                  {item.name}
                  {i !== data?.tags?.length - 1 ? "," : ""}
                </Link>
              ))}
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="w-full md:w-[30%] order-1 md:order-2 mt-4">
          {video && (
            <video autoPlay controls muted className="aspect-video rounded-lg">
              <source src={video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
          <div className="grid grid-cols-2 gap-4">
            {fotos?.slice(0, 3).map((item, i) => (
              <div key={i} className="min-w-[150px]">
                <Image
                  src={item.image}
                  alt=""
                  width={150}
                  height={150}
                  className="rounded-lg w-full h-full aspect-video"
                />
              </div>
            ))}
            <div className="min-w-[150px] h-auto md:w-full md:h-full bg-neutral-800 rounded-lg relative flex flex-col justify-center items-center">
              {data?.background_image && (
                <Image
                  src={data.background_image}
                  alt=""
                  width={150}
                  height={150}
                  className="rounded-lg w-auto h-auto opacity-25 absolute aspect-video"
                />
              )}
              <p className="font-semibold text-sm text-neutral-300">...</p>
              <p className="font-semibold text-sm text-neutral-300">view all</p>
            </div>
          </div>
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
      </div>
      {team.length ? (
        <div className="w-full mt-8 overflow-scroll">
          <h1 className="text-2xl font-bold text-neutral-100">
            {data?.name} created by
          </h1>
          {/* <div className="w-full flex gap-4 py-4">
            {team?.map((item, i) => (
              <CardBrowse
                pathname="/creators"
                classNames="w-[300px]"
                key={i}
                {...item}
              />
            ))}
          </div> */}
        </div>
      ) : (
        ""
      )}

      {posts?.length ? (
        <div className="mt-8">
          <div className="flex gap-2 items-center">
            <h1 className="text-2xl font-bold text-neutral-100">
              {data?.name} posts{" "}
            </h1>
            <Image src="/reddit.png" alt="" width={50} height={50} />
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
                  {item.username.replace("/u/", "")}
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Title;
