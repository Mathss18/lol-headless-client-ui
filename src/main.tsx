import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import ClientContextProvider from "./context/client/ClientContext.tsx";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes.tsx";
import ChatContextProvider from "./context/chat/ChatContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ClientContextProvider>
      <ChatContextProvider>
        <RouterProvider router={router} />
      </ChatContextProvider>
    </ClientContextProvider>
  </React.StrictMode>
);
