// import React from "react";
// import InputForm from "./InputForm";
// import { Link } from "react-router";

// const AppBar = () => {
//   return (
//     <div className="fixed top-0 left-0 h-full w-full md:w-80 bg-gray-800 shadow-xl z-10 transform md:translate-x-0 transition-transform duration-300 border-r border-gray-700">
//       <div className="p-4">
//         <div className="flex items-center justify-between mb-6">
//           <h1 className="text-2xl font-bold text-yellow-400">
//             Malahim's Persnal Diary
//           </h1>
//           <label
//             htmlFor="my-drawer-2"
//             className="btn btn-circle btn-ghost md:hidden text-gray-300"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-6 w-6"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M6 18L18 6M6 6l12 12"
//               />
//             </svg>
//           </label>
//         </div>

//         <div className="mb-6">
//           <InputForm />
//         </div>

//         <div className="form-control mb-6">
//           <input
//             type="text"
//             placeholder="Search notes..."
//             className="input w-full rounded-full bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400 focus:bg-gray-600 focus:ring-1 focus:ring-yellow-500"
//           />
//         </div>

//         <ul className="menu">
//           <li className="menu-title">
//             <span className="text-gray-400">All Note Types</span>
//             {/* <p>Sort By Cateogory</p> */}
//           </li>
//           <li>
//             <a className="hover:bg-gray-700 rounded-lg font-bold text-gray-300">
//               {/* <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-5 w-5 text-yellow-400"
//                 viewBox="0 0 20 20"
//                 fill="currentColor"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
//                   clipRule="evenodd"
//                 />
//               </svg> */}
//               Sort By Category
//             </a>
//           </li>
//           <li>
//             <Link to={"/general-notes"}>
//               <a className="flex gap-2  hover:bg-gray-700 rounded-lg text-gray-300">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-5 w-5 text-blue-400"
//                   viewBox="0 0 20 20"
//                   fill="currentColor"
//                 >
//                   <path
//                     fillRule="evenodd"
//                     d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
//                     clipRule="evenodd"
//                   />
//                 </svg>
//                 General
//               </a>
//             </Link>
//           </li>
//           <li>
//             <Link to={"/important-notes"}>
//               <a className="flex gap-2  hover:bg-gray-700 rounded-lg text-gray-300">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-5 w-5 text-blue-400"
//                   viewBox="0 0 20 20"
//                   fill="currentColor"
//                 >
//                   <path
//                     fillRule="evenodd"
//                     d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
//                     clipRule="evenodd"
//                   />
//                 </svg>
//                 IMPORTANT
//               </a>
//             </Link>
//           </li>
//           <li>
//             <Link to={"/professional-notes"}>
//               <a className="flex gap-2 hover:bg-gray-700 rounded-lg text-gray-300">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-5 w-5 text-green-400"
//                   viewBox="0 0 20 20"
//                   fill="currentColor"
//                 >
//                   <path
//                     fillRule="evenodd"
//                     d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z"
//                     clipRule="evenodd"
//                   />
//                 </svg>
//                 Work
//               </a>
//             </Link>
//           </li>
//           <li>
//             <Link to={"/shopping-notes"}>
//               <a className="flex gap-2 hover:bg-gray-700 rounded-lg text-gray-300">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-5 w-5 text-red-400"
//                   viewBox="0 0 20 20"
//                   fill="currentColor"
//                 >
//                   <path
//                     fillRule="evenodd"
//                     d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
//                     clipRule="evenodd"
//                   />
//                 </svg>
//                 Shopping
//               </a>
//             </Link>
//           </li>
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default AppBar;
import React from "react";
import { Link } from "react-router-dom";
import InputForm from "./InputForm";

const AppBar = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 flex justify-center z-50 pb-4">
      <div className="dock-container">
        <div className="app-dock">
          {/* New Note */}
          <Link to={"/"} className="app-icon" data-name="New Note">
            <InputForm />
            {/* <div className="icon-bg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-indigo-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div> */}
          </Link>

          {/* All Notes */}
          <Link to={"/"} className="app-icon" data-name="All Notes">
            <div className="icon-bg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-blue-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </Link>

          {/* Professional Notes */}
          <Link
            to={"/professional-notes"}
            className="app-icon"
            data-name="Professional"
          >
            <div className="icon-bg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-green-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
                <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
              </svg>
            </div>
          </Link>

          {/* Grocery Notes */}
          <Link to={"/grocery-notes"} className="app-icon" data-name="Grocery">
            <div className="icon-bg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-orange-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
              </svg>
            </div>
          </Link>

          {/* Shopping Notes */}
          <Link
            to={"/shopping-notes"}
            className="app-icon"
            data-name="Shopping"
          >
            <div className="icon-bg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-red-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </Link>

          {/* Ideas Notes */}
          <Link to={"/ideas-notes"} className="app-icon" data-name="Ideas">
            <div className="icon-bg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-yellow-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
              </svg>
            </div>
          </Link>

          {/* Event Notes */}
          <Link to={"/event-notes"} className="app-icon" data-name="Events">
            <div className="icon-bg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-purple-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </Link>
          {/* Important Notes */}
          <Link
            to={"/important-notes"}
            className="app-icon"
            data-name="Important"
          >
            <div className="icon-bg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-yellow-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
          </Link>
        </div>
      </div>

      <style jsx>{`
        /* Background pattern */
        .app-dock {
          background: rgba(45, 45, 45, 0.7);
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          border-radius: 24px;
          padding: 12px 20px;
          display: flex;
          gap: 16px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3),
            inset 0 1px 1px rgba(255, 255, 255, 0.1);
          position: relative;
          z-index: 10;
        }

        /* Reflection effect */
        .app-dock::after {
          content: "";
          position: absolute;
          top: -10px;
          left: 20%;
          width: 60%;
          height: 15px;
          background: linear-gradient(
            to bottom,
            rgba(255, 255, 255, 0.3),
            transparent
          );
          border-radius: 50%;
          opacity: 0.5;
          filter: blur(3px);
          z-index: -1;
        }

        /* App icon container */
        .app-icon {
          position: relative;
          display: flex;
          justify-content: center;
          transition: transform 0.3s cubic-bezier(0.25, 1, 0.5, 1);
        }

        /* Icon background */
        .icon-bg {
          width: 60px;
          height: 60px;
          border-radius: 16px;
          display: flex;
          justify-content: center;
          align-items: center;
          background: rgba(255, 255, 255, 0.9);
          box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15),
            inset 0 1px 2px rgba(255, 255, 255, 0.8),
            inset 0 -1px 1px rgba(0, 0, 0, 0.05);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        /* Icon reflection */
        .icon-bg::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 50%;
          background: linear-gradient(
            to bottom,
            rgba(255, 255, 255, 0.4),
            transparent
          );
          border-radius: 16px 16px 0 0;
          pointer-events: none;
        }

        /* Hover effect */
        .app-icon:hover {
          transform: scale(1.15) translateY(-15px);
        }

        .app-icon:hover .icon-bg {
          box-shadow: 0 12px 25px rgba(0, 0, 0, 0.25),
            inset 0 2px 3px rgba(255, 255, 255, 0.9),
            inset 0 -2px 2px rgba(0, 0, 0, 0.1);
        }

        /* App icon labels */
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
          z-index: 20;
        }

        .app-icon:hover::after {
          opacity: 1;
          transform: translateX(-50%) translateY(0);
        }

        /* Responsive adjustments */
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

export default AppBar;
