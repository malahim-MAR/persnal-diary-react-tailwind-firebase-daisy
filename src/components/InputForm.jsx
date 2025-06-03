import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToDiary } from "../redux/reducer/DataSlice";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../lib/firebase";

const InputForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(addToDiary({ diaryTitle: title, diaryContent: content }));
    setTitle("");
    setContent("");
    document.getElementById("my_modal_1").close();
    try {
      await addDoc(collection(db, "MyNotes"), {
        username: "Malahim",
        noteTitle: title,
        noteContent: content,
        noteTime: serverTimestamp(),
      });
    } catch {
      console.log("Error Occured");
    } finally {
      console.log("Proccesing Done ");
    }
  };
  // const addToNote = async () => {
  //   try {
  //     await addDoc(collection(db, "MyNotes"), {
  //       username: 'Malahim',
  //       noteTitle: title,
  //       noteContent: content,
  //       noteTime: serverTimestamp(),
  //     });
  //   }
  //   catch {
  //     console.log("Error Occured")
  //   }
  //   finally {
  //     console.log('Proccesing Done ')
  //   }

  // }

  return (
    <>
      <button
        className="btn bg-yellow-500 hover:bg-yellow-600 border-0 text-gray-900 shadow-md w-full font-medium"
        onClick={() => document.getElementById("my_modal_1").showModal()}
      >
        + New Note
      </button>

      <dialog id="my_modal_1" className="modal">
        <div className="modal-box max-w-2xl p-0 rounded-lg shadow-xl relative top-20 bg-gray-800 border border-gray-700">
          <form onSubmit={handleSubmit}>
            <div className="p-5 pb-3">
              <input
                required
                value={title}
                type="text"
                placeholder="Title"
                className="w-full px-0 text-lg font-semibold placeholder-gray-500 bg-transparent border-0 border-b border-gray-600 focus:outline-none focus:border-yellow-500 focus:ring-0 text-gray-100"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="p-5 pt-0">
              <textarea
                required
                value={content}
                placeholder="Take a note..."
                rows={4}
                className="w-full px-0 placeholder-gray-500 bg-transparent border-0 resize-none focus:outline-none focus:ring-0 text-gray-200"
                onChange={(e) => setContent(e.target.value)}
              />
            </div>

            <div className="flex justify-end p-3 bg-gray-700 rounded-b-lg">
              <div className="space-x-2">
                <button
                  type="button"
                  className="btn bg-gray-600 hover:bg-gray-500 border-0 text-gray-200"
                  onClick={() => document.getElementById("my_modal_1").close()}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn bg-yellow-500 hover:bg-yellow-600 border-0 text-gray-900 font-medium"
                  disabled={!title.trim() && !content.trim()}
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>

        <form method="dialog" className="modal-backdrop bg-black/70">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
};

export default InputForm;
