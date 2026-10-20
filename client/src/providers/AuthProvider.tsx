import { type ReactNode, useEffect, useMemo, useState } from "react";

import {
  login as loginRequest,
  logout as logoutRequest,
  me,
} from "../services";
import type { UserDto } from "../types";
import { AuthContext, type AuthContextValue } from "./AuthContext";

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<UserDto | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    me()
      .then(setUser)
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      loading,
      login: async (input) => {
        setUser(await loginRequest(input));
      },
      logout: async () => {
        try {
          await logoutRequest();
        } catch {
          //falla silenciosa
        }
        setUser(null);
      },
    }),
    [user, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthProvider };
