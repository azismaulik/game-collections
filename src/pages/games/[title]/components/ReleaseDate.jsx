import { formatDate } from "@/utils/formatDate";
import React from "react";

const ReleaseDate = ({ date }) => {
  return (
    <div>
      <h1 className="text-neutral-600 mb-2 font-bold">Release date</h1>
      <p className="font-semibold text-neutral-200">{formatDate(date)}</p>
    </div>
  );
};

export default ReleaseDate;
