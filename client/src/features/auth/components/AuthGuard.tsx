import { Navigate } from "react-router";
import useAuth from "../hooks/useAuth";

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center text-5xl text-blue-500">
        Loading...
      </div>
    );
  }
  if (user) {
    return <Navigate to={"/"} replace />;
  }

  return children;
};

export default AuthGuard;
