import React from "react";
import InputForm from "./InputForm";

const SideNavbar = () => {
  return (
    <div className="fixed top-0 left-0 h-full w-full md:w-80 bg-gray-800 shadow-xl z-10 transform md:translate-x-0 transition-transform duration-300 border-r border-gray-700">
      <div className="p-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-yellow-400">Malahim's Persnal Diary</h1>
          <label 
            htmlFor="my-drawer-2" 
            className="btn btn-circle btn-ghost md:hidden text-gray-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </label>
        </div>
        
        <div className="mb-6">
          <InputForm />
        </div>
        
        <div className="form-control mb-6">
          <input
            type="text"
            placeholder="Search notes..."
            className="input w-full rounded-full bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400 focus:bg-gray-600 focus:ring-1 focus:ring-yellow-500"
          />
        </div>
        
        <ul className="menu">
          <li className="menu-title">
            <span className="text-gray-400">Labels</span>
          </li>
          <li>
            <a className="hover:bg-gray-700 rounded-lg text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
              </svg>
              Create new label
            </a>
          </li>
          <li>
            <a className="hover:bg-gray-700 rounded-lg text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
              Personal
            </a>
          </li>
          <li>
            <a className="hover:bg-gray-700 rounded-lg text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
              </svg>
              Work
            </a>
          </li>
          <li>
            <a className="hover:bg-gray-700 rounded-lg text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
              </svg>
              Shopping
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideNavbar;