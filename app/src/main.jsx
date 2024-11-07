import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage.jsx";
import TestPage from "./components/TestPage/TestPage.jsx";
import "./main.css";
import MealDetail from "../frontend/components/MealDetail.jsx";
import MealsList from "../frontend/components/MealsList.jsx";

const router = createBrowserRouter([
  {
    
    path: "/",
    element: <HomePage />,
    
  },
  // This route can be removed and replaced with your own page
  {
    path: "/nested",
    element: <TestPage />,
  },
  {
    path: "/meals",
    element: <MealsList />,
  },
  {
    path: "/meals/:id", 
    element: <MealDetail />,
  },
  
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
