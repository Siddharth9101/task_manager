import { createBrowserRouter } from "react-router";
import { Register, Login } from "./features/auth/pages";
import { Create, Update, Dashboard } from "./features/tasks/pages";
import AuthGuard from "./features/auth/components/AuthGuard";
import Protected from "./features/auth/components/Protected";
import Layout from "./features/tasks/components/Layout";

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
        <Layout>
          <Dashboard />
        </Layout>
      </Protected>
    ),
  },
  {
    path: "/create",
    element: (
      <Protected>
        <Layout>
          <Create />
        </Layout>
      </Protected>
    ),
  },
  {
    path: "/update/:id",
    element: (
      <Protected>
        <Layout>
          <Update />
        </Layout>
      </Protected>
    ),
  },
]);
