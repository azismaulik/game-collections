import { apiKey, apiUrl } from "@/constants";
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

  React.useEffect(() => {
    getDetailGame();
    getFoto();
    getVideos();
  }, []);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex gap-1 text-xs uppercase">
        <Link href="/">Home</Link>
        <span>/</span>
        <Link href="/games">Games</Link>
        <span>/</span>
        <p>{data.name}</p>
      </div>
      <div>
        <div className="flex gap-4 items-center">
          <div className="text-black px-2 rounded-lg bg-white text-sm font-semibold">
            {data.released}
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
        <div className="w-full grid grid-cols-5 gap-4">
          <div className="col-span-3">
            <h1 className="text-6xl font-bold">{data.name}</h1>
            <h1 className="text-2xl font-bold mt-6 mb-3 border-bottom w-max">
              About
            </h1>
            <div
              dangerouslySetInnerHTML={{ __html: data?.description }}
              className="whitespace-pre-line text-sm font-semibold"
            />
          </div>
          <div className="col-span-2">
            {video && (
              <video
                autoPlay
                controls
                muted
                className="aspect-video rounded-lg"
              >
                <source src={video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
            <div className="grid grid-cols-2 gap-4">
              {fotos?.slice(0, 3).map((item, i) => (
                <div key={i}>
                  <Image
                    src={item.image}
                    alt=""
                    width={150}
                    height={150}
                    className="rounded-lg w-auto h-auto"
                  />
                </div>
              ))}
              <div className="w-full h-full bg-neutral-800 rounded-lg relative flex flex-col justify-center items-center">
                {data?.background_image && (
                  <Image
                    src={data.background_image}
                    alt=""
                    width={150}
                    height={150}
                    className="rounded-lg w-auto h-auto opacity-25 absolute"
                  />
                )}
                <p className="font-semibold text-sm text-neutral-300">...</p>
                <p className="font-semibold text-sm text-neutral-300">
                  view all
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Title;
