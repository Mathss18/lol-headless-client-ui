import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import TabContextProvider from "./context/tab/TabContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <TabContextProvider>
      <App />
    </TabContextProvider>
  </React.StrictMode>
);
