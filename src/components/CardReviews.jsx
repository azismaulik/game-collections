import { formatTanggal } from "@/utils/FormatTanggal";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const CardReviews = ({ id, game, text, reactions, user, created, edited }) => {
  return (
    <div
      className="flex-1 bg-cover rounded"
      style={{ backgroundImage: `url(${game?.background_image})` }}
    >
      <div className="p-4 bg-gradient-to-b from-neutral-900/60 to-neutral-900 w-full h-full">
        <Link
          href={`/games/${game?.slug}`}
          className="text-2xl font-bold text-neutral-100 hover:text-neutral-400 transition-all border-bottom"
        >
          {game?.name}
        </Link>
        <div
          className="line-clamp-[10] mt-2 text-sm"
          dangerouslySetInnerHTML={{ __html: text }}
        />
        {text.length > 300 && (
          <Link
            href={"reviews/" + id?.toString()}
            className="text-sm text-neutral-400 mt-4 hover:text-neutral-600 transition-all cursor-pointer"
          >
            Read more...
          </Link>
        )}

        <div className="flex gap-2 items-center mt-4 flex-wrap">
          {reactions?.map((item) => (
            <div
              className="text-xs uppercase bg-neutral-600/30 py-1 px-4 rounded-full text-neutral-200"
              key={item.id}
            >
              &bull; {item.title} &bull;
            </div>
          ))}
        </div>

        <div className="flex gap-2 mt-4">
          {user?.avatar && (
            <Image
              src={user?.avatar}
              alt={user?.username}
              width={50}
              height={50}
              className="rounded-full w-auto h-auto"
            />
          )}
          <div>
            <h1 className="text-neutral-100">{user?.username}</h1>
            <p className="text-neutral-500 text-xs">
              {formatTanggal(edited ? edited : created)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardReviews;
