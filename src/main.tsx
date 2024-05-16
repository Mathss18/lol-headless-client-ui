import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import ClientContextProvider from "./context/client/ClientContext.tsx";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ClientContextProvider>
      <RouterProvider router={router} />
    </ClientContextProvider>
  </React.StrictMode>
);
