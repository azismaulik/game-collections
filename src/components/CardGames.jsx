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

const CardGames = ({
  background_image,
  name,
  metacritic,
  parent_platforms,
  genres,
  released,
  slug,
}) => {
  return (
    <div className="flex-1 h-auto rounded-lg bg-neutral-900/70 relative hover:-translate-y-4 transition">
      <Link href={`/games/${slug}`}>
        {background_image ? (
          <Image
            src={background_image}
            alt={name}
            width={500}
            height={500}
            className="rounded-t-lg w-full h-[200px] object-cover"
            priority
          />
        ) : null}
      </Link>
      <div className="p-4 pb-6">
        <div className="flex justify-between my-2 items-center">
          <div className="flex gap-2 items-center">
            {parent_platforms
              ?.slice(
                0,
                parent_platforms?.length > 6 ? 6 : parent_platforms?.length
              )
              .map((item, i) => (
                <React.Fragment key={i}>
                  {imagePlatforms[item.platform.slug] && (
                    <Image
                      src={imagePlatforms[item.platform.slug]}
                      width={20}
                      height={20}
                      alt={item.platform.name}
                      className="w-5 h-5"
                      priority
                    />
                  )}
                </React.Fragment>
              ))}
            {parent_platforms?.length > 6 ? (
              <span className="text-sm text-green-500">
                +{parent_platforms?.length - 6}
              </span>
            ) : (
              ""
            )}
          </div>
          {metacritic && (
            <div className="py-1 px-2 border border-green-500 rounded">
              <p className="text-xs font-semibold text-green-600">
                {metacritic}
              </p>
            </div>
          )}
        </div>
        <Link
          href={`/games/${slug}`}
          className="text-2xl font-bold mt-4 hover:text-neutral-400 transition"
        >
          {name}
        </Link>
        <div>
          {released && (
            <div className="flex justify-between items-center mt-4 py-2 border-b border-neutral-800">
              <p className="text-xs text-neutral-500 font-semibold">
                Release date:
              </p>
              <p className="text-xs">{formatDate(released)}</p>
            </div>
          )}
          {genres.length ? (
            <div className="flex justify-between items-center py-2 border-b border-neutral-800">
              <p className="text-xs text-neutral-500 font-semibold">Genres:</p>
              <div>
                {genres?.map((item, i) => (
                  <Link
                    key={i}
                    href={`/genres/${item.slug}`}
                    className="text-xs underline hover:text-neutral-400 transition"
                  >
                    {item.name}
                    {i === genres.length - 1 ? "" : ", "}
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default CardGames;
