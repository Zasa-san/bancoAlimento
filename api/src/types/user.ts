import type { UserRole } from "../models/User.js";

interface UserDto {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface UserLike {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

const toUserDto = (user: UserLike): UserDto => ({
  id: user.id,
  name: user.name,
  email: user.email,
  role: user.role,
});

export { toUserDto };
