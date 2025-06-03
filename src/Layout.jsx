import React from "react";
import "./index.css";
import SideNavbar from "./components/SideNavbar";
import { Outlet } from "react-router";
import Footer from "./components/Footer";

const Layout = () => {
  return (
    <div className="flex min-h-screen bg-gray-900 text-gray-100">
      <SideNavbar />
      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-4 ml-0 md:ml-80">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;