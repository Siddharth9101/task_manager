import { createContext } from "react";
import type { Dispatch, SetStateAction } from "react";
import type { AccessTokenPayload } from "./types/user";

type AuthContextType = {
  user: AccessTokenPayload | null | undefined;
  setUser: Dispatch<SetStateAction<AccessTokenPayload | null | undefined>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);
