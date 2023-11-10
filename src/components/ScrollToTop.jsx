import Image from "next/image";
import React from "react";

const ScrollToTop = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 p-4 rounded-full bg-neutral-800 hover:bg-neutral-900 transition-all shadow shadow-neutral-600"
    >
      <Image
        src="/arrowRight.svg"
        alt="Scroll to top"
        width={30}
        height={30}
        className="cursor-pointer -rotate-[90deg]"
      />
    </div>
  );
};

export default ScrollToTop;
