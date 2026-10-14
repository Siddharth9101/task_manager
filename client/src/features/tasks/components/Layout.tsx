import type { ReactNode } from "react";
import useAuth from "../../auth/hooks/useAuth";
import { useNavigate } from "react-router";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  const { handleLogout } = useAuth();
  const navigate = useNavigate();
  return (
    <div className="min-h-screen ">
      <nav className="border-b  ">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <span className="text-xl text-white font-bold tracking-tight ">
            TaskManager
          </span>

          <div className="space-x-2">
            <button
              type="button"
              onClick={() => navigate("/create")}
              className="rounded-lg border  px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500"
            >
              Create
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-lg border  px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        {children}
      </main>
    </div>
  );
}
