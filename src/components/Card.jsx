import React, { useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { auth, db } from "../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { getAuth } from "firebase/auth";

const Card = () => {
  const [myNoteData, setMyNoteData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [editId, setEditId] = useState();
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [user, setUser] = useState(undefined);

  const getRandomHeight = (content) => {
    if (!content) return 150;
    const lineCount = content.split("\n").length;
    const charCount = content.length;

    // Base height calculation
    let height = 130 + lineCount * 20 + charCount / 30;

    // Apply min/max constraints
    height = Math.max(height, 150); // Minimum height
    height = Math.min(height, 400); // Maximum height

    return height;
  };

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
  //     setUser(firebaseUser || null);
  //   });
  //   return () => unsubscribe();
  // }, []);
  // console.log("User:", user.email);
  const auth = getAuth();
  const userEmail = auth.currentUser;
  useEffect(() => {
    // 1. Create query reference
    const notesQuery = query(
      collection(db, "MyNotes"),
      // orderBy("noteTime", "desc"),
      where("userEmail", "==", userEmail.email)
    );

    // 2. Set up real-time listener
    const unsubscribe = onSnapshot(
      notesQuery,
      (snapshot) => {
        // Handle successful data fetch
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
        // Handle errors
        console.error("Firestore error:", error);
        setError("Failed to load notes");
        setLoading(false);
      }
    );

    // 3. Clean up listener when component unmounts
    return () => {
      console.log("Unsubscribing from Firestore");
      unsubscribe();
    };
  }, []);

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
  console.log(myNoteData);
  const noteDelete = async (id) => {
    console.log("Delete note function called", id);
    await deleteDoc(doc(db, "MyNotes", id));
  };
  const noteEdit = (id, TitleNew, ContentNew) => {
    document.getElementById("my_modal_2").showModal();
    console.log("Edit note function called", editId);
    console.log("New Title:", TitleNew);
    console.log("New Content:", ContentNew);
    setEditId(id);
    setEditTitle(TitleNew);
    setEditContent(ContentNew);
  };
  const saveNote = async (e) => {
    e.preventDefault();
    console.log("Updated Title:", editTitle);
    console.log("Updated Content:", editContent);
    console.log("Note ID:", editId);

    // Optional: Call Firestore to update the note
    try {
      await updateDoc(doc(db, "MyNotes", editId), {
        noteTitle: editTitle,
        noteContent: editContent,
      });
      document.getElementById("my_modal_2").close(); // close modal after save
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  return (
    <>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      {/* <button className="btn" onClick={() => noteEdit(item.id)}>
        open modal
      </button> */}
      {/* <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Edit Note</h3>
          <input
            type="text"
            className="border"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />
          <textarea
            required
            value={editContent}
            placeholder="Update Your Note Value"
            rows={4}
            className="w-full px-0 placeholder-gray-500 bg-transparent border-0 resize-none focus:outline-none focus:ring-0 text-gray-200"
            onChange={(e) => setEditContent(e.target.value)}
          />

   
          <div className="modal-action">
            <form method="dialog">
             
              <button
                onClick={(e) => saveNote(e)}
                className="border cursor-pointer"
              >
                Update Now
              </button>
            </form>
          </div>
        </div>
      </dialog> */}
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box bg-base-200 p-6 rounded-lg shadow-xl max-w-md">
          <h3 className="font-bold text-2xl text-primary mb-4 pb-2 border-b border-base-300">
            Edit Note
          </h3>

          <div className="space-y-4 mt-4">
            <input
              type="text"
              className="input input-bordered w-full bg-base-100 focus:ring-2 focus:ring-primary focus:border-transparent"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              placeholder="Note Title"
            />

            <textarea
              required
              value={editContent}
              placeholder="Update your note content..."
              rows={6}
              className="textarea textarea-bordered w-full bg-base-100 focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
              onChange={(e) => setEditContent(e.target.value)}
            />
          </div>

          <div className="modal-action mt-6 gap-3">
            {/* Cancel button (closes modal without saving) */}
            <form method="dialog">
              <button className="btn btn-ghost hover:bg-base-300">
                Cancel
              </button>
            </form>

            {/* Update button (saves and closes modal) */}
            <button
              onClick={(e) => {
                saveNote(e);
                document.getElementById("my_modal_2").close();
              }}
              className="btn btn-primary px-6 text-white"
            >
              Update
            </button>
          </div>
        </div>

        {/* Backdrop click to close */}
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
      <div className="columns-1 sm:columns-2 lg:columns-4 xl:columns-4 gap-5 p-4 md:p-8 mt-16 md:mt-0 ">
        {myNoteData.map((item, index) => {
          const cardHeight = getRandomHeight(item.noteContent);

          return (
            <div
              key={index}
              className="bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden flex flex-col border border-gray-700 mb-5 break-inside-avoid"
              style={{ height: `${cardHeight}px` }}
            >
              {/* <p>{item.noteTime}</p> */}
              <div className="p-4 pb-2 flex-1 overflow-hidden">
                {item.noteTitle && (
                  <h2 className="font-semibold text-gray-100 mb-2 line-clamp-2">
                    {item.noteTitle}
                  </h2>
                )}
                <p className="text-gray-400 text-sm whitespace-pre-wrap overflow-hidden max-h-[calc(100%-40px)]">
                  {item.noteContent}
                </p>
              </div>

              <div className="p-2 bg-gray-700 flex justify-end gap-1 border-t border-gray-600">
                <button
                  onClick={() =>
                    noteEdit(item.id, item.noteTitle, item.noteContent)
                  }
                  className="p-2 rounded-full hover:bg-gray-600 transition-colors duration-150"
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
                  onClick={() => noteDelete(item.id)}
                  className="p-2 rounded-full hover:bg-gray-600 transition-colors duration-150"
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
    </>
  );
};

export default Card;
