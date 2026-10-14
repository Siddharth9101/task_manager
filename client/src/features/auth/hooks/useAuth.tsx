import { useContext } from "react";
import { AuthContext } from "../auth.context";
import { useNavigate } from "react-router";
import type { LoginUserInput, RegisterUserInput } from "../types/user";
import { fetchUser, login, logout, register } from "../services/auth.api";
import toast from "react-hot-toast";

const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within AuthContextProvider");
  }

  const navigate = useNavigate();

  const { user, setUser, loading, setLoading } = context;

  const handleRegister = async (data: RegisterUserInput) => {
    setLoading(true);
    try {
      const result = await register(data);
      if (!result.success) {
        throw new Error();
      }
      navigate("/", { replace: true });
      toast.success("Signed up, now Login to continue!");
    } catch (err) {
      console.error(`useAuth, line - 29, err: ${err}`);
      toast.error("Failed to register!");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (data: LoginUserInput) => {
    setLoading(true);
    try {
      const result = await login(data);
      if (!result.success) {
        throw new Error();
      }
      const userRes = await fetchUser();
      if (!userRes.success) {
        throw new Error();
      }
      setUser(userRes.data);
      navigate("/", { replace: true });
      toast.success("Logged in!");
    } catch (err) {
      console.error(`useAuth, line - 50, err: ${err}`);
      toast.error("Failed to login!");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      const response = await logout();
      if (!response.success) {
        throw new Error();
      }
      setUser(null);
      navigate("/login");
      toast.success("Logged out!");
    } catch (err) {
      console.log(`useAuth line - 66, err: ${err}`);
      toast.error("Failed to logout!");
    } finally {
      setLoading(false);
    }
  };

  return { handleRegister, handleLogin, handleLogout, user, loading };
};

export default useAuth;
