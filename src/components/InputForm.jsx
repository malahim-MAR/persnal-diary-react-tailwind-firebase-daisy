// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { addToDiary } from "../redux/reducer/DataSlice";
// import { collection, addDoc, serverTimestamp } from "firebase/firestore";
// import { db } from "../lib/firebase";
// import { getAuth } from "firebase/auth";

// const InputForm = () => {
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");
//   const [noteType, setNoteType] = useState("General");
//   const dispatch = useDispatch();

//   const auth = getAuth();
//   const user = auth.currentUser;
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     dispatch(addToDiary({ diaryTitle: title, diaryContent: content }));
//     setTitle("");
//     setContent("");
//     document.getElementById("my_modal_1").close();
//     try {
//       await addDoc(collection(db, "MyNotes"), {
//         userEmail: user.email,
//         noteTitle: title,
//         noteContent: content,
//         typeOfNote: noteType,
//         noteTime: serverTimestamp(),
//       });
//     } catch {
//       console.log("Error Occured");
//     } finally {
//       console.log("Processing Done");
//     }
//   };

//   return (
//     <>
//       {/* <button
//         className="btn bg-yellow-500 hover:bg-yellow-600 border-0 text-gray-900 shadow-md w-full font-medium py-3 text-lg"
//         onClick={() => document.getElementById("my_modal_1").showModal()}
//       >
//         + New Note
//       </button> */}
//       <div
//         className="icon-bg"
//         onClick={() => document.getElementById("my_modal_1").showModal()}
//       >
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           className="h-6 w-6 text-indigo-400"
//           viewBox="0 0 20 20"
//           fill="currentColor"
//         >
//           <path
//             fillRule="evenodd"
//             d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
//             clipRule="evenodd"
//           />
//         </svg>
//       </div>
//       <dialog id="my_modal_1" className="modal">
//         <div className="modal-box max-w-2xl p-0 rounded-lg shadow-xl bg-gray-800 border border-gray-700">
//           <form onSubmit={handleSubmit} className="flex flex-col">
//             {/* Header */}
//             <div className="p-4 border-b border-gray-700">
//               <h3 className="font-bold text-lg text-gray-200">
//                 Create New Note
//               </h3>
//             </div>

//             {/* Main Content */}
//             <div className="flex flex-col gap-4 p-5">
//               {/* Title Input */}
//               <div>
//                 <input
//                   required
//                   value={title}
//                   type="text"
//                   placeholder="Title"
//                   className="w-full px-3 py-2 text-lg font-semibold placeholder-gray-500 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-gray-100"
//                   onChange={(e) => setTitle(e.target.value)}
//                 />
//               </div>

//               {/* Content Textarea */}
//               <div>
//                 <textarea
//                   required
//                   value={content}
//                   placeholder="Take a note..."
//                   rows={4}
//                   className="w-full px-3 py-2 placeholder-gray-500 bg-gray-700 border border-gray-600 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-gray-200"
//                   onChange={(e) => setContent(e.target.value)}
//                 />
//               </div>

//               {/* Note Type Selection */}
//               <div className="grid grid-cols-2 gap-4">
//                 <div className="col-span-1">
//                   <label className="block text-sm font-medium text-gray-400 mb-1">
//                     Note Type:
//                   </label>
//                   <select
//                     value={noteType}
//                     onChange={(e) => setNoteType(e.target.value)}
//                     className="w-full bg-gray-700 border border-gray-600 text-gray-200 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
//                   >
//                     <option value="General">General</option>
//                     <option value="Professional">Professional</option>
//                     <option value="Grocery">Grocery</option>
//                     <option value="Shopping">Shopping</option>
//                     <option value="Ideas">Ideas</option>
//                     {/* <option value="Daily">Daily</option> */}
//                     <option value="Event">Event</option>
//                     <option value="IMPORTANT">IMPORTANT</option>
//                   </select>
//                 </div>

//                 {/* Empty space for alignment */}
//                 <div className="col-span-1"></div>
//               </div>
//             </div>

//             {/* Footer Buttons */}
//             <div className="flex justify-end p-4 bg-gray-750 border-t border-gray-700 rounded-b-lg">
//               <div className="flex gap-3">
//                 <button
//                   type="button"
//                   className="btn bg-gray-600 hover:bg-gray-500 border-0 text-gray-200 px-6 py-2 rounded-md"
//                   onClick={() => document.getElementById("my_modal_1").close()}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="btn bg-yellow-500 hover:bg-yellow-600 border-0 text-gray-900 font-medium px-6 py-2 rounded-md disabled:bg-yellow-700 disabled:cursor-not-allowed"
//                   disabled={!title.trim() && !content.trim()}
//                 >
//                   Save
//                 </button>
//               </div>
//             </div>
//           </form>
//         </div>

//         {/* Modal Backdrop */}
//         <form method="dialog" className="modal-backdrop bg-black/70">
//           <button>close</button>
//         </form>
//       </dialog>
//     </>
//   );
// };

// export default InputForm;
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToDiary } from "../redux/reducer/DataSlice";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../lib/firebase";
import { getAuth } from "firebase/auth";

const InputForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [noteType, setNoteType] = useState("General");
  const dispatch = useDispatch();

  const auth = getAuth();
  const user = auth.currentUser;

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(addToDiary({ diaryTitle: title, diaryContent: content }));
    setTitle("");
    setContent("");
    document.getElementById("my_modal_1").close();
    try {
      await addDoc(collection(db, "MyNotes"), {
        userEmail: user.email,
        noteTitle: title,
        noteContent: content,
        typeOfNote: noteType,
        noteTime: serverTimestamp(),
      });
    } catch {
      console.log("Error Occured");
    } finally {
      console.log("Processing Done");
    }
  };

  return (
    <>
      <div
        className="icon-bg cursor-pointer hover:scale-110 transition-transform duration-300"
        onClick={() => document.getElementById("my_modal_1").showModal()}
      >
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
      </div>

      <dialog id="my_modal_1" className="modal">
        <div className="modal-box max-w-2xl p-0 rounded-xl overflow-hidden border border-gray-700/50 backdrop-blur-2xl">
          <div className="glass-container">
            {/* Reflection effect */}
            <div className="reflection-top"></div>

            <form onSubmit={handleSubmit} className="flex flex-col">
              {/* Header */}
              <div className="p-5 border-b border-gray-700/30">
                <h3 className="font-bold text-xl text-gray-200 flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-indigo-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Create New Note
                </h3>
              </div>

              {/* Main Content */}
              <div className="flex flex-col gap-5 p-5">
                {/* Title Input */}
                <div className="glass-input">
                  <input
                    required
                    value={title}
                    type="text"
                    placeholder="Title"
                    className="w-full bg-transparent border-0 focus:outline-none text-lg font-semibold placeholder-gray-500 text-gray-200"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                {/* Content Textarea */}
                <div className="glass-input h-40">
                  <textarea
                    required
                    value={content}
                    placeholder="Take a note..."
                    className="w-full h-full bg-transparent border-0 focus:outline-none resize-none placeholder-gray-500 text-gray-200"
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>

                {/* Note Type Selection */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-1">
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Note Type:
                    </label>
                    <div className="glass-input relative">
                      <select
                        value={noteType}
                        onChange={(e) => setNoteType(e.target.value)}
                        className="w-full bg-transparent border-0 focus:outline-none text-gray-200 appearance-none"
                      >
                        <option value="General">General</option>
                        <option value="Professional">Professional</option>
                        <option value="Grocery">Grocery</option>
                        <option value="Shopping">Shopping</option>
                        <option value="Ideas">Ideas</option>
                        <option value="Event">Event</option>
                        <option value="IMPORTANT">IMPORTANT</option>
                      </select>
                      {/* Custom dropdown arrow */}
                      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-gray-400">
                        <svg
                          className="h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-1"></div>
                </div>
              </div>

              {/* Footer Buttons */}
              <div className="flex justify-end p-5 border-t border-gray-700/30">
                <div className="flex gap-3">
                  <button
                    type="button"
                    className="glass-button bg-gray-600/50 hover:bg-gray-500/50 text-gray-200 px-6 py-2 rounded-lg"
                    onClick={() =>
                      document.getElementById("my_modal_1").close()
                    }
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="glass-button bg-yellow-500/80 hover:bg-yellow-600/80 text-gray-900 font-medium px-6 py-2 rounded-lg disabled:bg-yellow-700/50 disabled:text-gray-700 disabled:cursor-not-allowed"
                    disabled={!title.trim() && !content.trim()}
                    onClick={handleSubmit}
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Modal Backdrop */}
        <form
          method="dialog"
          className="modal-backdrop bg-black/70 backdrop-blur-sm"
        >
          <button>close</button>
        </form>
      </dialog>

      <style jsx>{`
        .glass-container {
          background: rgba(45, 45, 45, 0.6);
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          border-radius: 16px;
          position: relative;
          overflow: hidden;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4),
            inset 0 1px 1px rgba(255, 255, 255, 0.1);
        }

        .reflection-top {
          position: absolute;
          top: 0;
          left: 20%;
          width: 60%;
          height: 15px;
          background: linear-gradient(
            to bottom,
            rgba(255, 255, 255, 0.2),
            transparent
          );
          border-radius: 50%;
          opacity: 0.5;
          filter: blur(4px);
          z-index: 1;
        }

        .glass-input {
          background: rgba(30, 30, 30, 0.3);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 14px;
          padding: 14px;
          box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.2),
            0 2px 5px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }

        .glass-input:focus-within {
          border-color: rgba(255, 217, 0, 0.3);
          box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.3),
            0 0 0 2px rgba(255, 217, 0, 0.2);
        }

        .glass-button {
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 14px;
          transition: all 0.3s ease;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2),
            inset 0 1px 1px rgba(255, 255, 255, 0.1);
          font-weight: 500;
        }

        .glass-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3),
            inset 0 1px 1px rgba(255, 255, 255, 0.15);
        }

        .glass-button:active {
          transform: translateY(1px);
        }

        input,
        textarea,
        select {
          background: transparent !important;
          border: none !important;
          outline: none !important;
          box-shadow: none !important;
        }

        /* Custom dropdown styles */
        select {
          width: 100%;
          appearance: none;
          -webkit-appearance: none;
          -moz-appearance: none;
          background: transparent;
          cursor: pointer;
        }

        /* Dropdown options styling */
        select option {
          background: rgba(45, 45, 45, 0.95) !important;
          color: #f3f4f6 !important;
          padding: 8px 12px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        select option:checked {
          background: rgba(59, 130, 246, 0.5) !important;
          color: white !important;
        }

        select option:hover {
          background: rgba(59, 130, 246, 0.7) !important;
        }

        /* Disabled button styling */
        .glass-button:disabled {
          opacity: 0.7;
          transform: none !important;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2) !important;
        }

        .modal-box {
          background: transparent !important;
          max-width: 90vw;
        }
      `}</style>
    </>
  );
};

export default InputForm;
