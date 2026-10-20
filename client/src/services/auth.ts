import type { LoginInput } from "../schemas";
import type { UserDto } from "../types";
import { http } from "./http";

const login = async (input: LoginInput): Promise<UserDto> => {
  const { data } = await http.post<{ user: UserDto }>("/auth/login", input);
  return data.user;
};

const me = async (): Promise<UserDto> => {
  const { data } = await http.get<{ user: UserDto }>("/auth/me");
  return data.user;
};

const logout = async (): Promise<void> => {
  await http.post("/auth/logout");
};

export { login, logout, me };
