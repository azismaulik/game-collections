import React from "react";
import Sidebar from "../Sidebar";
import Header from "../Header";
import { useRouter } from "next/router";
import ScrollToTop from "../ScrollToTop";

const Layout = ({ children }) => {
  const { pathname } = useRouter();
  return (
    <main className="flex w-full">
      <Sidebar />
      <div className="flex-1 p-4 overflow-hidden">
        {!pathname.includes("/games/search") && <Header />}
        {children}
      </div>
      <ScrollToTop />
    </main>
  );
};

export default Layout;
