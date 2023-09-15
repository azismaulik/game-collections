import Image from "next/image";
import Link from "next/link";
import React from "react";

const pc = "/platforms/pc.svg";
const playstation = "/platforms/playstation.svg";
const xbox = "/platforms/xbox.svg";
const nintendo = "/platforms/nintendo.svg";
const ios = "/platforms/ios.svg";
const android = "/platforms/android.svg";

const CardGames = ({
  background_image,
  name,
  metacritic,
  parent_platforms,
  genres,
  released,
  slug,
}) => {
  const [isHover, setIsHover] = React.useState(false);
  return (
    <div
      className="flex-1 h-auto rounded-lg bg-neutral-900/70 relative"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <Link href={`/games/${slug}`}>
        {background_image && (
          <Image
            src={background_image}
            alt=""
            width={400}
            height={200}
            className="rounded-t-lg w-full h-[200px] object-cover max-h-full"
            priority
          />
        )}
      </Link>
      <div className="p-4">
        <div className="flex justify-between my-2 items-center">
          <div className="flex gap-2 items-center">
            {parent_platforms?.map((item, i) => (
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
                    ? "/platforms/mac.svg"
                    : item.platform.slug === "linux"
                    ? "/platforms/linux.svg"
                    : item.platform.slug === "web"
                    ? "/platforms/web.svg"
                    : ""
                }
                width={20}
                height={20}
                alt=""
              />
            ))}
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
              <p className="text-xs">{released}</p>
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
          <Link
            className="flex justify-between items-center mt-4 p-4 rounded-lg text-sm bg-neutral-800 hover:bg-neutral-800/70 transition text-neutral-200"
            href={`/discover/games-like-${slug}`}
          >
            <span>Show more like this</span>
            <Image src="/arrowRight.svg" alt="" width={20} height={20} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CardGames;
