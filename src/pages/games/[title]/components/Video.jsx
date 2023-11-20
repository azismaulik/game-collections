import { apiCall } from "@/services/api";
import { useRouter } from "next/router";
import React from "react";

const Video = () => {
  const router = useRouter();
  const { title } = router.query;
  const [videoUrl, setVideoUrl] = React.useState("");

  React.useEffect(() => {
    const getVideos = async () => {
      try {
        const response = await apiCall({
          base: `games/${title}/movies`,
        });
        setVideoUrl(response.results[0]?.data?.max);
      } catch (error) {
        console.log(error);
      }
    };
    getVideos();
  }, [title]);

  return (
    <>
      {videoUrl && (
        <div className="w-full mb-4">
          <video
            autoPlay={true}
            controls={true}
            muted
            className="aspect-video rounded w-full"
          >
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </>
  );
};

export default Video;
