import React from "react";
import Sidebar from "../Sidebar";
import Header from "../Header";
import { useRouter } from "next/router";

const Layout = ({ children }) => {
  const { pathname } = useRouter();
  return (
    <main className="flex w-full">
      <Sidebar />
      <div className="flex-1 p-8">
        {!pathname.includes("/games/search") && <Header />}
        {children}
      </div>
    </main>
  );
};

export default Layout;
