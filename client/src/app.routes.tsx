import { createBrowserRouter } from "react-router";
import { Register, Login } from "./features/auth/pages";
import { Create, Update, Dashboard } from "./features/tasks/pages";
import AuthGuard from "./features/auth/components/AuthGuard";
import Protected from "./features/auth/components/Protected";

export const router = createBrowserRouter([
  {
    path: "/register",
    element: (
      <AuthGuard>
        <Register />
      </AuthGuard>
    ),
  },
  {
    path: "/login",
    element: (
      <AuthGuard>
        <Login />
      </AuthGuard>
    ),
  },
  {
    path: "/",
    element: (
      <Protected>
        <Dashboard />
      </Protected>
    ),
  },
  {
    path: "/create",
    element: (
      <Protected>
        <Create />
      </Protected>
    ),
  },
  {
    path: "/update",
    element: (
      <Protected>
        <Update />
      </Protected>
    ),
  },
]);
