import Image from "next/image";
import Link from "next/link";
import React from "react";

const CardBrowse = ({
  image_background,
  name,
  games,
  games_count,
  slug,
  image,
  pathname,
  classNames,
  positions,
}) => {
  return (
    <div
      className={`rounded-lg bg-cover bg-center ${classNames}`}
      style={{ backgroundImage: `url(${image_background})` }}
    >
      <div className="bg-gradient-to-b from-neutral-900/60 to-neutral-900/95 p-6 pt-10 h-full rounded-lg">
        {image && (
          <Image
            src={image}
            alt=""
            width={120}
            height={120}
            className="mx-auto rounded-full aspect-square"
          />
        )}
        <div className="flex justify-center mt-4">
          <Link
            href={`${pathname}/${slug}`}
            className="text-xl w-max font-bold text-center border-bottom"
          >
            {name}
          </Link>
        </div>
        <div className="flex justify-center mt-1 gap-1">
          {positions?.map((item, i) => (
            <p key={i}>
              {item.name}
              {i === positions?.length - 1 ? "" : ", "}
            </p>
          ))}
        </div>
        <div className="flex justify-between items-center mt-6 mb-4 py-2 border-b border-neutral-500">
          <h1 className="font-bold">Popular items</h1>
          <p className="text-sm text-neutral-400 font-semibold">
            {games_count.toLocaleString()}
          </p>
        </div>
        <div className="flex flex-col gap-2">
          {games.map((item, i) => (
            <div key={i} className="flex justify-between gap-2">
              <Link
                href={`/games/${item.slug}`}
                className="border-bottom text-sm font-semibold hover:text-neutral-400 transition line-clamp-1"
              >
                {item.name}
              </Link>
              <p className="text-sm text-neutral-400 font-semibold flex gap-1">
                {item.added.toLocaleString()}{" "}
                <Image
                  src="/user.svg"
                  alt=""
                  width={15}
                  height={15}
                  className="w-4 h-4"
                />
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardBrowse;
