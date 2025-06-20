import React from "react";
import { where } from "firebase/firestore";
import Card from "../components/Card";

const Idea = () => {
  const IdeaFilter = [where("typeOfNote", "==", "Ideas")];

  return <Card customFilter={IdeaFilter} />;
};

export default Idea;
