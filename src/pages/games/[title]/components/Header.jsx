import { formatDate } from "@/utils/formatDate";
import Image from "next/image";
import Link from "next/link";
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
const sega = "/platforms/sega.svg";

const imagePlatforms = {
  pc,
  playstation,
  xbox,
  nintendo,
  ios,
  android,
  mac,
  linux,
  web,
  sega,
};

const Header = ({ data }) => {
  return (
    <>
      <div className="flex gap-1 text-xs uppercase mt-6">
        <Link href="/">Home</Link>
        <span>/</span>
        <Link href="/games">Games</Link>
        <span>/</span>
        <p>{data.name}</p>
      </div>
      <div className="flex flex-wrap gap-2 items-center">
        <div className="text-black px-2 rounded-lg bg-white text-sm font-semibold">
          {formatDate(data.released)}
        </div>
        <div className="flex gap-2 items-center my-4">
          {data.parent_platforms?.map((item, i) => (
            <Image
              key={i}
              src={imagePlatforms[item.platform.slug]}
              width={20}
              height={20}
              alt=""
              className="w-5 h-5"
            />
          ))}
        </div>
        {data?.playtime > 0 && (
          <p className="text-sm uppercase">
            Average playtime: {data?.playtime} hours
          </p>
        )}
      </div>
      <h1 className="text-4xl md:text-6xl font-bold">{data?.name}</h1>
    </>
  );
};

export default Header;
