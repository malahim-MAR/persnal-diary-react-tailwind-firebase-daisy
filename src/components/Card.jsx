// import React, { useEffect, useState } from "react";
// import {
//   collection,
//   deleteDoc,
//   doc,
//   onSnapshot,
//   query,
//   updateDoc,
//   where,
// } from "firebase/firestore";
// import { auth, db } from "../lib/firebase";
// import { getAuth } from "firebase/auth";

// const Card = ({ customFilter = [] }) => {
//   const [myNoteData, setMyNoteData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [editId, setEditId] = useState();
//   const [editTitle, setEditTitle] = useState("");
//   const [editContent, setEditContent] = useState("");
//   const [deleteId, setDeleteId] = useState(null);
//   const [viewNote, setViewNote] = useState(null); // State for viewing full note

//   const getRandomHeight = (content) => {
//     if (!content) return 150;
//     const lineCount = content.split("\n").length;
//     const charCount = content.length;

//     let height = 150 + lineCount * 20 + charCount / 30;
//     height = Math.max(height, 150);
//     height = Math.min(height, 400);

//     return height;
//   };

//   useEffect(() => {
//     const auth = getAuth();
//     const userEmail = auth.currentUser;

//     if (!userEmail?.email) {
//       setLoading(false);
//       setMyNoteData([]);
//       return;
//     }

//     // Create base query with user filter + custom filters
//     const queryConstraints = [
//       where("userEmail", "==", userEmail.email),
//       ...customFilter,
//     ];

//     const notesQuery = query(collection(db, "MyNotes"), ...queryConstraints);

//     const unsubscribe = onSnapshot(
//       notesQuery,
//       (snapshot) => {
//         const notes = [];
//         if (snapshot.empty) {
//           console.log("No notes found");
//           setMyNoteData([]);
//         } else {
//           snapshot.forEach((doc) => {
//             notes.push({ id: doc.id, ...doc.data() });
//           });
//           setMyNoteData(notes);
//         }
//         setLoading(false);
//       },
//       (error) => {
//         console.error("Firestore error:", error);
//         setError("Failed to load notes");
//         setLoading(false);
//       }
//     );

//     return () => {
//       console.log("Unsubscribing from Firestore");
//       unsubscribe();
//     };
//   }, [customFilter]);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <p className="text-gray-400">
//           <span className="loading loading-dots loading-xl"></span>
//         </p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <p className="text-red-500">Error: {error}</p>
//       </div>
//     );
//   }

//   if (!myNoteData.length) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <p className="text-gray-400">No notes found</p>
//       </div>
//     );
//   }

//   const noteDelete = async (id) => {
//     console.log("Delete note function called", id);
//     await deleteDoc(doc(db, "MyNotes", id));
//     setDeleteId(null);
//     setViewNote(null); // Close view modal if deleting the open note
//   };

//   const saveNote = async (e) => {
//     e.preventDefault();
//     try {
//       await updateDoc(doc(db, "MyNotes", editId), {
//         noteTitle: editTitle,
//         noteContent: editContent,
//       });
//       document.getElementById("edit_modal").close();
//       setViewNote(null); // Close view modal after editing
//     } catch (error) {
//       console.error("Error updating note:", error);
//     }
//   };

//   // Open note in view mode
//   const openNoteView = (note) => {
//     setViewNote(note);
//     setEditTitle(note.noteTitle);
//     setEditContent(note.noteContent);
//     setEditId(note.id);
//     document.getElementById("view_modal").showModal();
//   };

//   // Switch to edit mode from view modal
//   const switchToEdit = () => {
//     document.getElementById("edit_modal").showModal();
//     document.getElementById("view_modal").close();
//   };

//   return (
//     <>
//       {/* View Note Modal */}
//       <dialog id="view_modal" className="modal">
//         <div className="modal-box bg-base-200 p-6 rounded-lg shadow-xl max-w-3xl max-h-[90vh] flex flex-col">
//           <div className="overflow-y-auto flex-1">
//             <h3 className="font-bold text-2xl text-primary mb-4 pb-2 border-b border-base-300">
//               {viewNote?.noteTitle || "Untitled Note"}
//             </h3>

//             {/* Note Type Badge */}
//             {viewNote?.typeOfNote && (
//               <div className="mb-4">
//                 <span className="badge badge-primary">
//                   {viewNote.typeOfNote}
//                 </span>
//               </div>
//             )}

//             <div className="whitespace-pre-wrap text-gray-300 text-base">
//               {viewNote?.noteContent}
//             </div>
//           </div>

//           <div className="modal-action mt-6 gap-3 border-t border-base-300 pt-4">
//             <button
//               className="btn btn-ghost"
//               onClick={() => document.getElementById("view_modal").close()}
//             >
//               Close
//             </button>
//             <button
//               className="btn btn-primary"
//               onClick={switchToEdit}
//             >
//               Edit
//             </button>
//             <button
//               className="btn btn-error"
//               onClick={() => {
//                 setDeleteId(viewNote?.id);
//                 document.getElementById("delete_confirm_modal").showModal();
//               }}
//             >
//               Delete
//             </button>
//           </div>
//         </div>
//         <form method="dialog" className="modal-backdrop">
//           <button>close</button>
//         </form>
//       </dialog>

//       {/* Edit Note Modal */}
//       <dialog id="edit_modal" className="modal">
//         <div className="modal-box bg-base-200 p-6 rounded-lg shadow-xl max-w-3xl max-h-[90vh] flex flex-col">
//           <h3 className="font-bold text-2xl text-primary mb-4 pb-2 border-b border-base-300">
//             Edit Note
//           </h3>

//           <div className="flex-1 overflow-y-auto">
//             <input
//               type="text"
//               className="input input-bordered w-full bg-base-100 focus:ring-2 focus:ring-primary focus:border-transparent mb-4"
//               value={editTitle}
//               onChange={(e) => setEditTitle(e.target.value)}
//               placeholder="Note Title"
//             />

//             <textarea
//               required
//               value={editContent}
//               placeholder="Update your note content..."
//               className="textarea textarea-bordered w-full bg-base-100 focus:ring-2 focus:ring-primary focus:border-transparent resize-none min-h-[300px]"
//               onChange={(e) => setEditContent(e.target.value)}
//             />
//           </div>

//           <div className="modal-action mt-6 gap-3">
//             <button
//               className="btn btn-ghost"
//               onClick={() => {
//                 document.getElementById("edit_modal").close();
//                 document.getElementById("view_modal").showModal();
//               }}
//             >
//               Cancel
//             </button>
//             <button
//               onClick={(e) => {
//                 saveNote(e);
//               }}
//               className="btn btn-primary px-6 text-white"
//             >
//               Update
//             </button>
//           </div>
//         </div>
//         <form method="dialog" className="modal-backdrop">
//           <button>close</button>
//         </form>
//       </dialog>

//       {/* Delete Confirmation Modal */}
//       <dialog id="delete_confirm_modal" className="modal">
//         <div className="modal-box bg-base-200 p-6 rounded-lg shadow-xl max-w-md">
//           <h3 className="font-bold text-xl text-error mb-4">
//             Are you sure you want to delete?
//           </h3>
//           <p className="text-gray-600 mb-6">
//             This action cannot be undone. The note will be permanently removed.
//           </p>

//           <div className="modal-action gap-3">
//             <button
//               className="btn btn-ghost"
//               onClick={() => {
//                 setDeleteId(null);
//                 document.getElementById("delete_confirm_modal").close();
//               }}
//             >
//               Cancel
//             </button>
//             <button
//               className="btn btn-error text-white"
//               onClick={() => {
//                 noteDelete(deleteId);
//                 document.getElementById("delete_confirm_modal").close();
//                 document.getElementById("view_modal").close();
//               }}
//             >
//               Yes, Delete
//             </button>
//           </div>
//         </div>
//         <form method="dialog" className="modal-backdrop">
//           <button onClick={() => setDeleteId(null)}>close</button>
//         </form>
//       </dialog>

//       <div className="columns-1 sm:columns-2 lg:columns-4 xl:columns-4 gap-5 p-4 md:p-8 mt-16 md:mt-0">
//         {myNoteData.map((item, index) => {
//           const cardHeight = getRandomHeight(item.noteContent);

//           return (
//             <div
//               key={index}
//               className="bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden flex flex-col border border-gray-700 mb-5 break-inside-avoid cursor-pointer"
//               style={{ height: `${cardHeight}px` }}
//               onClick={() => openNoteView(item)}
//             >
//               <div className="p-4 pb-2 flex-1 overflow-hidden">
//                 {/* Note Type Badge */}
//                 {item.typeOfNote && (
//                   <div className="mb-2">
//                     <span className="badge badge-sm badge-primary">
//                       {item.typeOfNote}
//                     </span>
//                   </div>
//                 )}

//                 {item.noteTitle && (
//                   <h2 className="font-semibold text-gray-100 mb-2 line-clamp-2">
//                     {item.noteTitle}
//                   </h2>
//                 )}
//                 <p className="text-gray-400 text-sm whitespace-pre-wrap overflow-hidden max-h-[calc(100%-40px)]">
//                   {item.noteContent}
//                 </p>
//               </div>

//               <div className="p-2 bg-gray-700 flex justify-end gap-1 border-t border-gray-600">
//                 <button
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     openNoteView(item);
//                     switchToEdit();
//                   }}
//                   className="p-2 rounded-full hover:bg-gray-600 transition-colors duration-150"
//                   aria-label="Edit note"
//                 >
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-4 w-4 text-gray-400"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
//                     />
//                   </svg>
//                 </button>
//                 <button
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     setDeleteId(item.id);
//                     document.getElementById("delete_confirm_modal").showModal();
//                   }}
//                   className="p-2 rounded-full hover:bg-gray-600 transition-colors duration-150"
//                   aria-label="Delete note"
//                 >
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-4 w-4 text-gray-400"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
//                     />
//                   </svg>
//                 </button>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </>
//   );
// };

// export default Card;
import React, { useEffect, useState, useRef } from "react";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { auth, db } from "../lib/firebase";
import { getAuth } from "firebase/auth";

const Card = ({ customFilter = [] }) => {
  const [myNoteData, setMyNoteData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editId, setEditId] = useState();
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const [viewNote, setViewNote] = useState(null);
  const textareaRef = useRef(null);

  // Auto-resize textarea for edit modal
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = 
        Math.max(textareaRef.current.scrollHeight, 200) + "px";
    }
  }, [editContent]);

  const getRandomHeight = (content) => {
    if (!content) return 150;
    const lineCount = content.split("\n").length;
    const charCount = content.length;

    let height = 150 + lineCount * 20 + charCount / 30;
    height = Math.max(height, 150);
    height = Math.min(height, 400);

    return height;
  };

  useEffect(() => {
    const auth = getAuth();
    const userEmail = auth.currentUser;

    if (!userEmail?.email) {
      setLoading(false);
      setMyNoteData([]);
      return;
    }

    const queryConstraints = [
      where("userEmail", "==", userEmail.email),
      ...customFilter,
    ];

    const notesQuery = query(collection(db, "MyNotes"), ...queryConstraints);

    const unsubscribe = onSnapshot(
      notesQuery,
      (snapshot) => {
        const notes = [];
        if (snapshot.empty) {
          console.log("No notes found");
          setMyNoteData([]);
        } else {
          snapshot.forEach((doc) => {
            notes.push({ id: doc.id, ...doc.data() });
          });
          setMyNoteData(notes);
        }
        setLoading(false);
      },
      (error) => {
        console.error("Firestore error:", error);
        setError("Failed to load notes");
        setLoading(false);
      }
    );

    return () => {
      console.log("Unsubscribing from Firestore");
      unsubscribe();
    };
  }, [customFilter]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-400">
          <span className="loading loading-dots loading-xl"></span>
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  if (!myNoteData.length) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-400">No notes found</p>
      </div>
    );
  }

  const noteDelete = async (id) => {
    console.log("Delete note function called", id);
    await deleteDoc(doc(db, "MyNotes", id));
    setDeleteId(null);
    setViewNote(null);
  };

  const saveNote = async (e) => {
    e.preventDefault();
    try {
      await updateDoc(doc(db, "MyNotes", editId), {
        noteTitle: editTitle,
        noteContent: editContent,
      });
      document.getElementById("edit_modal").close();
      setViewNote(null);
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  // Open note in view mode
  const openNoteView = (note) => {
    setViewNote(note);
    setEditTitle(note.noteTitle);
    setEditContent(note.noteContent);
    setEditId(note.id);
    document.getElementById("view_modal").showModal();
  };

  // Switch to edit mode from view modal
  const switchToEdit = () => {
    document.getElementById("edit_modal").showModal();
    document.getElementById("view_modal").close();
  };

  // Color mapping for note types
  const getTypeColor = (type) => {
    switch (type) {
      case "Professional": return "bg-green-500/20 text-green-400";
      case "Grocery": return "bg-orange-500/20 text-orange-400";
      case "Shopping": return "bg-red-500/20 text-red-400";
      case "Ideas": return "bg-yellow-500/20 text-yellow-400";
      case "Event": return "bg-purple-500/20 text-purple-400";
      case "IMPORTANT": return "bg-red-500/40 text-red-300";
      default: return "bg-blue-500/20 text-blue-400";
    }
  };

  return (
    <>
      {/* View Note Modal */}
      <dialog id="view_modal" className="modal">
        <div className="modal-box max-w-3xl p-0 rounded-xl overflow-hidden backdrop-blur-2xl">
          <div className="glass-container flex flex-col max-h-[85vh]">
            <div className="reflection-top"></div>
            
            <div className="flex flex-col flex-1 min-h-0">
              <div className="p-5 border-b border-gray-700/30 bg-gray-800/50">
                <h3 className="font-bold text-xl text-gray-200 flex items-center gap-2 truncate">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-400" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 13H11V9.413l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13H5.5z" />
                    <path d="M9 13h2v5a1 1 0 11-2 0v-5z" />
                  </svg>
                  {viewNote?.noteTitle || "Untitled Note"}
                </h3>
              </div>
              
              <div className="flex flex-col gap-5 p-5 flex-1 overflow-hidden bg-gray-800/30">
                {/* Note Type Badge */}
                {viewNote?.typeOfNote && (
                  <div className="inline-block">
                    <span className={`${getTypeColor(viewNote.typeOfNote)} px-3 py-1 rounded-full text-sm font-medium`}>
                      {viewNote.typeOfNote}
                    </span>
                  </div>
                )}
                
                <div className="glass-input bg-gray-800/20 flex-1 min-h-[200px] overflow-y-auto">
                  <div className="whitespace-pre-wrap text-gray-200">
                    {viewNote?.noteContent}
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end p-5 border-t border-gray-700/30 gap-3 bg-gray-800/50">
                <button
                  className="glass-button bg-gray-600/50 hover:bg-gray-500/50 text-gray-200 px-6 py-2 rounded-lg"
                  onClick={() => document.getElementById("view_modal").close()}
                >
                  Close
                </button>
                <button
                  className="glass-button bg-blue-500/80 hover:bg-blue-600/80 text-gray-200 font-medium px-6 py-2 rounded-lg"
                  onClick={switchToEdit}
                >
                  Edit
                </button>
                <button
                  className="glass-button bg-red-500/80 hover:bg-red-600/80 text-gray-200 font-medium px-6 py-2 rounded-lg"
                  onClick={() => {
                    setDeleteId(viewNote?.id);
                    document.getElementById("delete_confirm_modal").showModal();
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop bg-black/70 backdrop-blur-sm">
          <button>close</button>
        </form>
      </dialog>

      {/* Edit Note Modal */}
      <dialog id="edit_modal" className="modal">
        <div className="modal-box max-w-3xl p-0 rounded-xl overflow-hidden backdrop-blur-2xl">
          <div className="glass-container flex flex-col max-h-[85vh]">
            <div className="reflection-top"></div>
            
            <form onSubmit={saveNote} className="flex flex-col flex-1 min-h-0">
              <div className="p-5 border-b border-gray-700/30 bg-gray-800/50">
                <h3 className="font-bold text-xl text-gray-200 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-400" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                  Edit Note
                </h3>
              </div>
              
              <div className="flex flex-col gap-5 p-5 flex-1 overflow-hidden bg-gray-800/30">
                <div className="glass-input bg-gray-800/20">
                  <input
                    type="text"
                    className="w-full bg-transparent border-0 focus:outline-none text-lg font-semibold placeholder-gray-500 text-gray-200"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    placeholder="Note Title"
                  />
                </div>

                <div className="glass-input bg-gray-800/20 flex-1 min-h-[200px]">
                  <textarea
                    ref={textareaRef}
                    required
                    value={editContent}
                    placeholder="Update your note content..."
                    className="w-full h-full bg-transparent border-0 focus:outline-none resize-none placeholder-gray-500 text-gray-200"
                    onChange={(e) => setEditContent(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="flex justify-end p-5 border-t border-gray-700/30 gap-3 bg-gray-800/50">
                <button
                  className="glass-button bg-gray-600/50 hover:bg-gray-500/50 text-gray-200 px-6 py-2 rounded-lg"
                  onClick={() => {
                    document.getElementById("edit_modal").close();
                    document.getElementById("view_modal").showModal();
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="glass-button bg-yellow-500/80 hover:bg-yellow-600/80 text-gray-900 font-medium px-6 py-2 rounded-lg"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop bg-black/70 backdrop-blur-sm">
          <button>close</button>
        </form>
      </dialog>

      {/* Delete Confirmation Modal */}
      <dialog id="delete_confirm_modal" className="modal">
        <div className="modal-box max-w-md p-0 rounded-xl overflow-hidden backdrop-blur-2xl">
          <div className="glass-container">
            <div className="reflection-top"></div>
            
            <div className="flex flex-col">
              <div className="p-5 border-b border-gray-700/30 bg-gray-800/50">
                <h3 className="font-bold text-xl text-red-400 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  Confirm Deletion
                </h3>
              </div>
              
              <div className="p-5 bg-gray-800/30">
                <p className="text-gray-400 mb-6">
                  Are you sure you want to delete this note? This action cannot be undone.
                </p>
              </div>
              
              <div className="flex justify-end p-5 border-t border-gray-700/30 gap-3 bg-gray-800/50">
                <button
                  className="glass-button bg-gray-600/50 hover:bg-gray-500/50 text-gray-200 px-6 py-2 rounded-lg"
                  onClick={() => {
                    setDeleteId(null);
                    document.getElementById("delete_confirm_modal").close();
                  }}
                >
                  Cancel
                </button>
                <button
                  className="glass-button bg-red-500/80 hover:bg-red-600/80 text-gray-200 font-medium px-6 py-2 rounded-lg"
                  onClick={() => {
                    noteDelete(deleteId);
                    document.getElementById("delete_confirm_modal").close();
                    document.getElementById("view_modal").close();
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop bg-black/70 backdrop-blur-sm">
          <button onClick={() => setDeleteId(null)}>close</button>
        </form>
      </dialog>

      <div className="columns-1 sm:columns-2 lg:columns-4 xl:columns-4 gap-5 p-4 md:p-8 mt-16 md:mt-0">
        {myNoteData.map((item, index) => {
          const cardHeight = getRandomHeight(item.noteContent);

          return (
            <div
              key={index}
              className="glass-card rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 overflow-hidden flex flex-col border border-gray-700/30 mb-5 break-inside-avoid cursor-pointer"
              style={{ height: `${cardHeight}px` }}
              onClick={() => openNoteView(item)}
            >
              <div className="p-4 pb-2 flex-1 overflow-hidden">
                {/* Note Type Badge */}
                {item.typeOfNote && (
                  <div className="mb-2">
                    <span className={`${getTypeColor(item.typeOfNote)} px-2 py-1 rounded-full text-xs font-medium`}>
                      {item.typeOfNote}
                    </span>
                  </div>
                )}
                
                {item.noteTitle && (
                  <h2 className="font-semibold text-gray-100 mb-2 line-clamp-2">
                    {item.noteTitle}
                  </h2>
                )}
                <p className="text-gray-400 text-sm whitespace-pre-wrap overflow-hidden max-h-[calc(100%-40px)]">
                  {item.noteContent}
                </p>
              </div>

              <div className="p-2 bg-gray-800/50 flex justify-end gap-1 border-t border-gray-700/30">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openNoteView(item);
                    switchToEdit();
                  }}
                  className="p-2 rounded-full hover:bg-gray-700/50 transition-colors duration-150"
                  aria-label="Edit note"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setDeleteId(item.id);
                    document.getElementById("delete_confirm_modal").showModal();
                  }}
                  className="p-2 rounded-full hover:bg-gray-700/50 transition-colors duration-150"
                  aria-label="Delete note"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <style jsx>{`
        .glass-container {
          background: rgba(45, 45, 45, 0.7);
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
          background: linear-gradient(to bottom, rgba(255, 255, 255, 0.2), transparent);
          border-radius: 50%;
          opacity: 0.5;
          filter: blur(4px);
          z-index: 1;
        }
        
        .glass-input {
          background: rgba(30, 30, 30, 0.4);
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
        
        .glass-card {
          background: rgba(45, 45, 45, 0.4);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3),
                      inset 0 1px 1px rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
        }
        
        .glass-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.4),
                      inset 0 1px 1px rgba(255, 255, 255, 0.15);
        }
        
        input, textarea, select {
          background: transparent !important;
          border: none !important;
          outline: none !important;
          box-shadow: none !important;
        }
        
        .modal-box {
          background: transparent !important;
          max-width: 90vw;
        }
      `}</style>
    </>
  );
};

export default Card;