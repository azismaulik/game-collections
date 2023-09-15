import Image from "next/image";
import Link from "next/link";
import React from "react";

const TitleBrowse = ({ title, length, href }) => {
  return (
    <Link href={href} className="flex text-2xl items-center gap-1 mt-10">
      <h1 className="font-bold border-bottom">{title} </h1>
      <span className="text-neutral-500 ml-2 font-semibold">{length}</span>
      <Image
        src="/arrowRight.svg"
        alt="logo"
        width={20}
        height={20}
        className="mt-1"
      />
    </Link>
  );
};

export default TitleBrowse;
