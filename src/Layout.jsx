import React from "react";
import "./index.css";
import SideNavbar from "./components/SideNavbar";
import { Outlet } from "react-router";
import Footer from "./components/Footer";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebase";

const Layout = () => {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser || null);
    });
    return () => unsubscribe();
  }, []);

  // if (user === undefined) {

  // } // Checking the user

  return (
    <div className="flex min-h-screen bg-gray-900 text-gray-100">
      {user && (
        <div className="hidden md:block w-80 bg-gray-800 h-full fixed top-0 left-0 z-50">
          <SideNavbar />
        </div>
      )}
      {/* <SideNavbar /> */}
      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-4 ml-0 md:ml-80">
          <Outlet />
        </main>
        {user && (
          <div className="md:hidden fixed bottom-0 left-0 right-0 bg-gray-800 p-4 z-50">
            <Footer />
          </div>
        )}
      </div>
    </div>
  );
};

export default Layout;
