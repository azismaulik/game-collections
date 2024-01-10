import { imagePlatforms } from "@/constants";
import { formatDate } from "@/utils/formatDate";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = ({ data }) => {
  return (
    <>
      <div className="flex gap-1 text-xs uppercase mt-6">
        <Link href="/">Home</Link>
        <span>/</span>
        <Link href="/games">Games</Link>
        <span>/</span>
        <p>{data?.name}</p>
      </div>
      <div className="flex flex-wrap gap-2 items-center">
        <div className="text-black px-2 rounded-lg bg-white text-sm font-semibold">
          {formatDate(data.released)}
        </div>
        <div className="flex gap-2 items-center my-4">
          {data.parent_platforms?.map((item, i) => (
            <Image
              key={i}
              src={imagePlatforms[item?.platform?.slug]}
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
      <h1 className="text-4xl md:text-6xl font-bold">{data?.name || ""}</h1>
    </>
  );
};

export default Header;
