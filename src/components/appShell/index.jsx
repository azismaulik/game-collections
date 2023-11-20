import React from "react";
import Sidebar from "../Sidebar";
import Header from "../Header";
import { useRouter } from "next/router";
import ScrollToTop from "../ScrollToTop";

const Layout = ({ children }) => {
  const { pathname } = useRouter();
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <main className="flex w-full">
      <Sidebar />
      <div className="flex-1 p-4 overflow-hidden">
        {!pathname.includes("/games/search") && <Header />}
        {children}
      </div>
      {scrolled && <ScrollToTop />}
    </main>
  );
};

export default Layout;
