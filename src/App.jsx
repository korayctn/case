import { useState } from "react";

import "./App.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import Details from "./pages/Details/Details.jsx";
import { store } from "./app/store";
import { Provider } from "react-redux";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/details/:licenseNum",
      element: <Details />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
