import React from "react";
import { useSelector } from "react-redux";

const Card = () => {
  const diaryItems = useSelector((state) => state.diary.diaryItems);
  console.log(diaryItems);
  return (
    <>
      <h1>Your Pernsal Taks</h1>
      <div className="flex flex-wrap justify-center">
        {diaryItems.map((item, index) => {
          return (
            <div key={index} className="card w-96 bg-base-100 shadow-xl m-4">
              <div className="card-body">
                <h2 className="card-title">{item.diaryTitle}</h2>
                <p>{item.diaryContent}</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">Edit</button>
                  <button className="btn btn-secondary">Delete</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Card;
