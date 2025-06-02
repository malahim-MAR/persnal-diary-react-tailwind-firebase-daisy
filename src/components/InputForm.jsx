import React from "react";

const InputForm = () => {
  return (
    <div className="flex">
      <label className="input w-100">
        <input type="search" required placeholder="Add Your Tasks" />
      </label>
      <button className="btn btn-soft">Default</button>
    </div>
  );
};

export default InputForm;
