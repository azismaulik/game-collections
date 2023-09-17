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

  const getDetailGame = async () => {
    try {
      const response = await fetch(`${apiUrl}/games/${title}?key=${apiKey}`);
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getDetailGame();
  }, [title]);

  return (
    <div
    //  style={{backgroundImage: `url(${data.background_image})`}} className="w-full bg-center bg-cover bg-no-repeat">
    >
      <div className="flex gap-1 text-xs uppercase">
        <Link href="/">Home</Link>
        <span>/</span>
        <Link href="/games">Games</Link>
        <span>/</span>
        <p>{data.name}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 mt-6">
        <div>
          <div className="flex gap-4 items-center">
            <div className="text-black px-2 rounded-lg bg-white text-sm font-semibold">
              {data.released}
            </div>
            <div className="flex gap-2 items-center">
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
                />
              ))}
            </div>
            <p className="text-sm uppercase">
              Average playtime: {data?.playtime} hours
            </p>
          </div>
          <h1 className="text-6xl font-bold my-4">{data.name}</h1>
        </div>
      </div>
      <div dangerouslySetInnerHTML={{ __html: data?.description }} />
    </div>
  );
};

export default Title;
