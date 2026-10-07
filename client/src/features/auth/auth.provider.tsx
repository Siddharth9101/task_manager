import React, { useEffect, useState } from "react";
import { fetchUser } from "./services/auth.api";
import type { AccessTokenPayload } from "./types/user";
import { AuthContext } from "./auth.context";

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
      try {
        const data = await fetchUser();
        if (data.success) {
          setUser(data.data);
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error(err);
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
