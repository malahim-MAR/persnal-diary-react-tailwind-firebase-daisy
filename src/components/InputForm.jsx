import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToDiary } from "../redux/reducer/DataSlice";

const InputForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(title, content);
    dispatch(addToDiary({ diaryTitle: title, diaryContent: content }));
    setTitle("");
    setContent("");
    // Add your form submission logic here
  };

  return (
    <>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <button
        className="btn"
        onClick={() => document.getElementById("my_modal_1").showModal()}
      >
        open modal
      </button>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          {/* <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">
            Press ESC key or click the button below to close
          </p> */}
          <div className="min-h-screen flex items-center justify-center p-4 bg-base-200">
            <div className="card w-full max-w-md bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title text-2xl font-bold mb-4">
                  Create New Note
                </h2>
                <form onSubmit={handleSubmit}>
                  <div className="form-control mb-4">
                    <label className="label">
                      <span className="label-text font-medium">Title</span>
                    </label>
                    <input
                      value={title}
                      type="text"
                      required
                      placeholder="Note title"
                      className="input input-bordered w-full focus:ring-2 focus:ring-primary"
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>

                  <div className="form-control mb-6">
                    <label className="label">
                      <span className="label-text font-medium">Content</span>
                    </label>
                    <textarea
                      value={content}
                      required
                      rows={5}
                      placeholder="Write your note here..."
                      className="textarea textarea-bordered w-full focus:ring-2 focus:ring-primary"
                      onChange={(e) => setContent(e.target.value)}
                    />
                  </div>

                  <div className="card-actions justify-end">
                    <button
                      type="submit"
                      className="btn btn-primary w-full md:w-auto"
                    >
                      Save Note
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default InputForm;
