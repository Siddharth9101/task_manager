import { useContext } from "react";
import { AuthContext } from "../auth.context";
import { useNavigate } from "react-router";
import type { LoginUserInput, RegisterUserInput } from "../types/user";
import { login, register, fetchUser } from "../services/auth.api";

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
      setUser(result.data);
      navigate("/");
    } catch (err) {
      console.error(err);
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
      setUser(result.data);
      navigate("/");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getMe = async () => {
    setLoading(true);
    try {
      const result = await fetchUser();
      if (!result.success) {
        throw new Error();
      }
      setUser(result.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return { handleRegister, handleLogin, getMe, user, loading };
};

export default useAuth;
