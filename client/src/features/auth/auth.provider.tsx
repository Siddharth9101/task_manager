import React, { useEffect, useState } from "react";
import type { AccessTokenPayload } from "./types/user";
import { AuthContext } from "./auth.context";
import { fetchUser } from "./services/auth.api";

export default function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<AccessTokenPayload | null | undefined>(
    undefined,
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const response = await fetchUser();
        if (!response.success) {
          throw new Error();
        }
        setUser(response.data);
      } catch (err) {
        console.log(`authProvider, line - 26, err: ${err}`);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading, setLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
