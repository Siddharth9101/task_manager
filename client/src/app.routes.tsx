import { createBrowserRouter } from "react-router";
import { Register, Login } from "./features/auth/pages";
import { Create, Update, Dashboard } from "./features/tasks/pages";

export const router = createBrowserRouter([
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/create",
    element: <Create />,
  },
  {
    path: "/update",
    element: <Update />,
  },
]);
