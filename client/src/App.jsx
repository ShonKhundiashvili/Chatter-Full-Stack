import { useState } from "react";
import Chat from "./pages/Chat";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";

export default function App() {
  return <RouterProvider router={router} />;
}

const router = createBrowserRouter([{ path: "", element: <Chat /> }]);
