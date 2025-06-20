import React from "react";
import { where } from "firebase/firestore";
import Card from "../components/Card";

const Events = () => {
  const EventsFilter = [where("typeOfNote", "==", "Event")];

  return <Card customFilter={EventsFilter} />;
};

export default Events;
