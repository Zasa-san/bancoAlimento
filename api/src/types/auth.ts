import type { UserRole } from "../models/index.js";
import type { UserDto } from "./user.js";

interface TokenPayload {
  sub: string;
  role: UserRole;
}

type AuthenticatedUser = UserDto;

export type { AuthenticatedUser, TokenPayload };
