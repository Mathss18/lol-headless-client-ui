import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { DashboardPage } from "./pages/dashboard/Dashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/dashboard",
    element: <DashboardPage />,
  }
]);