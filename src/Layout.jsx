// import React from "react";
// import "./index.css";
// import SideNavbar from "./components/SideNavbar";
// import { Outlet } from "react-router";
// import Footer from "./components/Footer";
// import { useState, useEffect } from "react";
// import { onAuthStateChanged } from "firebase/auth";
// import { auth } from "./lib/firebase";
// import Header from "./components/Header";

// const Layout = () => {
//   const [user, setUser] = useState(undefined);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
//       setUser(firebaseUser || null);
//     });
//     return () => unsubscribe();
//   }, []);

//   // if (user === undefined) {

//   // } // Checking the user

//   return (
//     <>
//       {/* <div className="flex min-h-screen bg-gray-900 text-gray-100">
//         {user && (
//           <div className="drawer drawer-mobile">
//             <Header />
//             <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
//             <div className="drawer-content flex flex-col">
        
//               <div className="flex-1 p-4 md:ml-80">
//                 <Outlet />
//               </div>
//               {user && (
//                 <div className="md:hidden fixed bottom-0 left-0 right-0 bg-gray-800 p-4 z-50">
//                   <Footer />
//                 </div>
//               )}
//             </div>

        
//             <div className="drawer-side">
//               <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
//               <div className="w-80 bg-gray-800 h-full border-r border-gray-700">
//                 <SideNavbar />
//               </div>
//             </div>
//           </div>
//         )}
//       </div> */}
//       <div className="flex min-h-screen bg-gray-900 text-gray-100">
//         {/* {user && (
//           <div className="hidden md:block w-80 bg-gray-800 h-full fixed top-0 left-0 z-50">
//             <SideNavbar />
//           </div>
//         )} */}
//         {/* <SideNavbar /> */}
//         {/* <div className="flex-1 flex flex-col"> */}
//         <main className="flex-1 p-4 ml-0 md:ml-80">
//           <Outlet />
//         </main>
//         <div>
//           <SideNavbar />
//         </div>
//         {/* {user && (
//             <div className="md:hidden fixed bottom-0 left-0 right-0 bg-gray-800 p-4 z-50">
//               <Footer />
//             </div>
//           )} */}
//         {/* </div> */}
//       </div>
//     </>
//   );
// };

// export default Layout;
import React, { useState, useEffect } from "react";
import { Outlet } from "react-router";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebase";
import SideNavbar from "./components/AppBar";
import AppBar from "./components/AppBar";

const Layout = () => {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser || null);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gray-900 to-gray-800"></div>
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc1IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWx0ZXI9InVybCgjYSkiIG9wYWNpdHk9IjAuMDMiLz48L3N2Zz4=')]"></div>
      </div>

      {/* Main content area */}
      <div className="relative z-10 min-h-screen flex flex-col">
        <div className="flex-1">
          <Outlet />
        </div>
        
        {/* App Dock */}
        {user && (
          <AppBar/>
          // <div className="fixed bottom-0 left-0 right-0 flex justify-center z-50 pb-4">
          //   <div className="dock-container">
          //     <div className="app-dock">
          //       <a href="/" className="app-icon" data-name="All Notes">
          //         <div className="icon-bg">
          //           <svg
          //             xmlns="http://www.w3.org/2000/svg"
          //             className="h-6 w-6 text-blue-400"
          //             viewBox="0 0 20 20"
          //             fill="currentColor"
          //           >
          //             <path
          //               fillRule="evenodd"
          //               d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
          //               clipRule="evenodd"
          //             />
          //           </svg>
          //         </div>
          //       </a>
                
          //       <a href="/professional-notes" className="app-icon" data-name="Professional">
          //         <div className="icon-bg">
          //           <svg
          //             xmlns="http://www.w3.org/2000/svg"
          //             className="h-6 w-6 text-green-400"
          //             viewBox="0 0 20 20"
          //             fill="currentColor"
          //           >
          //             <path
          //               fillRule="evenodd"
          //               d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
          //               clipRule="evenodd"
          //             />
          //             <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
          //           </svg>
          //         </div>
          //       </a>
                
          //       <a href="/grocery-notes" className="app-icon" data-name="Grocery">
          //         <div className="icon-bg">
          //           <svg
          //             xmlns="http://www.w3.org/2000/svg"
          //             className="h-6 w-6 text-orange-400"
          //             viewBox="0 0 20 20"
          //             fill="currentColor"
          //           >
          //             <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
          //           </svg>
          //         </div>
          //       </a>
                
          //       <a href="/shopping-notes" className="app-icon" data-name="Shopping">
          //         <div className="icon-bg">
          //           <svg
          //             xmlns="http://www.w3.org/2000/svg"
          //             className="h-6 w-6 text-red-400"
          //             viewBox="0 0 20 20"
          //             fill="currentColor"
          //           >
          //             <path
          //               fillRule="evenodd"
          //               d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
          //               clipRule="evenodd"
          //             />
          //           </svg>
          //         </div>
          //       </a>
                
          //       <a href="/ideas-notes" className="app-icon" data-name="Ideas">
          //         <div className="icon-bg">
          //           <svg
          //             xmlns="http://www.w3.org/2000/svg"
          //             className="h-6 w-6 text-yellow-400"
          //             viewBox="0 0 20 20"
          //             fill="currentColor"
          //           >
          //             <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
          //           </svg>
          //         </div>
          //       </a>
                
          //       <a href="/event-notes" className="app-icon" data-name="Events">
          //         <div className="icon-bg">
          //           <svg
          //             xmlns="http://www.w3.org/2000/svg"
          //             className="h-6 w-6 text-purple-400"
          //             viewBox="0 0 20 20"
          //             fill="currentColor"
          //           >
          //             <path
          //               fillRule="evenodd"
          //               d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
          //               clipRule="evenodd"
          //             />
          //           </svg>
          //         </div>
          //       </a>
          //     </div>
          //   </div>
          // </div>
        )}
      </div>

      <style jsx>{`
        .app-dock {
          background: rgba(45, 45, 45, 0.7);
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          border-radius: 24px;
          padding: 12px 20px;
          display: flex;
          gap: 16px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 
            0 10px 30px rgba(0, 0, 0, 0.3),
            inset 0 1px 1px rgba(255, 255, 255, 0.1);
          position: relative;
          z-index: 10;
        }
        
        .app-dock::after {
          content: "";
          position: absolute;
          top: -10px;
          left: 20%;
          width: 60%;
          height: 15px;
          background: linear-gradient(to bottom, rgba(255, 255, 255, 0.3), transparent);
          border-radius: 50%;
          opacity: 0.5;
          filter: blur(3px);
          z-index: -1;
        }
        
        .app-icon {
          position: relative;
          display: flex;
          justify-content: center;
          transition: transform 0.3s cubic-bezier(0.25, 1, 0.5, 1);
        }
        
        .icon-bg {
          width: 60px;
          height: 60px;
          border-radius: 16px;
          display: flex;
          justify-content: center;
          align-items: center;
          background: rgba(255, 255, 255, 0.9);
          box-shadow: 
            0 6px 15px rgba(0, 0, 0, 0.15),
            inset 0 1px 2px rgba(255, 255, 255, 0.8),
            inset 0 -1px 1px rgba(0, 0, 0, 0.05);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        
        .icon-bg::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 50%;
          background: linear-gradient(to bottom, rgba(255, 255, 255, 0.4), transparent);
          border-radius: 16px 16px 0 0;
          pointer-events: none;
        }
        
        .app-icon:hover {
          transform: scale(1.15) translateY(-15px);
        }
        
        .app-icon:hover .icon-bg {
          box-shadow: 
            0 12px 25px rgba(0, 0, 0, 0.25),
            inset 0 2px 3px rgba(255, 255, 255, 0.9),
            inset 0 -2px 2px rgba(0, 0, 0, 0.1);
        }
        
        .app-icon::after {
          content: attr(data-name);
          position: absolute;
          bottom: -30px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 12px;
          color: white;
          background: rgba(0, 0, 0, 0.7);
          padding: 4px 10px;
          border-radius: 8px;
          opacity: 0;
          transition: all 0.3s ease;
          font-weight: 500;
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          letter-spacing: 0.5px;
          white-space: nowrap;
          pointer-events: none;
        }
        
        .app-icon:hover::after {
          opacity: 1;
          transform: translateX(-50%) translateY(0);
        }
        
        @media (max-width: 768px) {
          .app-dock {
            padding: 10px 16px;
            gap: 12px;
          }
          
          .icon-bg {
            width: 50px;
            height: 50px;
            border-radius: 14px;
          }
          
          .app-icon:hover {
            transform: scale(1.1) translateY(-10px);
          }
        }
        
        @media (max-width: 480px) {
          .app-dock {
            padding: 8px 12px;
            gap: 8px;
            border-radius: 20px;
          }
          
          .icon-bg {
            width: 44px;
            height: 44px;
            border-radius: 12px;
          }
          
          .app-icon:hover {
            transform: scale(1.08) translateY(-8px);
          }
          
          .app-icon::after {
            font-size: 10px;
            padding: 3px 8px;
            bottom: -25px;
          }
        }
      `}</style>
    </div>
  );
};

export default Layout;