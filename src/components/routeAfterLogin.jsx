import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout.jsx";
import Home from "../Pages/Home.jsx";
import Professional from "../Pages/Professional.jsx";
import Important from "../Pages/Important.jsx";
import General from "../Pages/All.jsx";
import Event from "../Pages/Events.jsx";
import Shopping from "../Pages/Shopping.jsx";
import Grocery from "../Pages/Grocery.jsx";
import Idea from "../Pages/Idea.jsx";
import All from "../Pages/All.jsx";

const routesBeforeLogin = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "professional-notes",
        element: <Professional />,
      },
      {
        path: "important-notes",
        element: <Important />,
      },
      {
        path: "shopping-notes",
        element: <Shopping />,
      },
      {
        path: "/",
        element: <All />,
      },
      {
        path: "grocery-notes",
        element: <Grocery />,
      },
        {
        path: "ideas-notes",
        element: <Idea />,
      },
      {
        path: "event-notes",
        element: <Event />,
      },
    ],
  },
]);
export default routesBeforeLogin;
