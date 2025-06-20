import React from "react";
import { where } from "firebase/firestore";
import Card from "../components/Card";

const Grocery = () => {
  const GroceryFilter = [where("typeOfNote", "==", "Grocery")];

  return <Card customFilter={GroceryFilter} />;
};

export default Grocery;
