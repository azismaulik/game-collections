import { apiCall } from "@/services/api";
import { formatTanggal } from "@/utils/FormatTanggal";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const review = () => {
  const router = useRouter();
  const { id } = router.query;
  const [review, setReview] = React.useState(null);
  const fetchReview = async () => {
    try {
      const response = await apiCall({
        base: `reviews/${id}`,
      });
      setReview(response);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    fetchReview();
  }, [id]);

  return (
    <div className="max-w-3xl mx-auto">
      <div
        className="flex-1 bg-cover rounded"
        style={{ backgroundImage: `url(${review?.game?.background_image})` }}
      >
        <div className="p-4 bg-gradient-to-b from-neutral-900/60 to-neutral-900 w-full h-full">
          <Link
            href={`/games/${review?.game?.slug}`}
            className="text-2xl font-bold text-neutral-100 hover:text-neutral-400 transition-all border-bottom"
          >
            {review?.game?.name}
          </Link>
          <div
            className="mt-2 text-sm"
            dangerouslySetInnerHTML={{ __html: review?.text }}
          />

          <div className="flex gap-2 items-center mt-4 flex-wrap">
            {review?.reactions?.map((item) => (
              <div
                className="text-xs uppercase bg-neutral-600/30 py-1 px-4 rounded-full text-neutral-200"
                key={item.id}
              >
                &bull; {item.title} &bull;
              </div>
            ))}
          </div>

          <div className="flex gap-2 mt-4">
            {review?.user?.avatar && (
              <Image
                src={review?.user?.avatar}
                alt={review?.user?.username}
                width={50}
                height={50}
                className="rounded-full w-auto h-auto"
              />
            )}
            <div>
              <h1 className="text-neutral-100">{review?.user?.username}</h1>
              <p className="text-neutral-500 text-xs">
                {formatTanggal(
                  review?.edited ? review?.edited : review?.created
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default review;
