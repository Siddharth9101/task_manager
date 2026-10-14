import { RouterProvider } from "react-router";
import { router } from "./app.routes";
import AuthContextProvider from "./features/auth/auth.provider";
import TaskContextProvider from "./features/tasks/task.provider";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <>
      <Toaster />
      <AuthContextProvider>
        <TaskContextProvider>
          <RouterProvider router={router} />
        </TaskContextProvider>
      </AuthContextProvider>
    </>
  );
};

export default App;
