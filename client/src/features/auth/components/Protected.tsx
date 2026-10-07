import React from "react";
import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router";

const Protected = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center text-5xl text-blue-500">
        Loading...
      </div>
    );
  }
  if (!user) {
    return <Navigate to={"/login"} />;
  }

  return children;
};

export default Protected;
