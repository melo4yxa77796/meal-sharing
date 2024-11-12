import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage.jsx";
import TestPage from "./components/TestPage/TestPage.jsx";
import "./main.css";
import MealDetail from "../frontend/components/MealDetail.jsx";
import MealsList from "../frontend/components/MealsList.jsx";
import ReviewsPage from "../frontend/components/ReviewsPage.jsx";
import Contacts from "../frontend/components/Contacts.jsx"; 
import Layout from "../frontend/components/Layout.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, 
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/nested", element: <TestPage /> },
      { path: "/meals", element: <MealsList /> },
      { path: "/meals/:id", element: <MealDetail /> },
      { path: "/reviews", element: <ReviewsPage /> },
      { path: "/contacts", element: <Contacts /> },
    ],
  },

  {
    path: "/",
    element: <HomePage />,
  },

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
  {
    path: "/reviews",
    element: <ReviewsPage />,
  },
  {
    path:"/contacts",
    element:<Contacts />,
  },
 
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
