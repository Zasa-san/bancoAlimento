import { createContext } from "react";

import type { LoginInput } from "../schemas";
import type { UserDto } from "../types";

interface AuthContextValue {
  user: UserDto | null;
  loading: boolean;
  login: (input: LoginInput) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export type { AuthContextValue };
export { AuthContext };
