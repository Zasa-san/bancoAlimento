type UserRole = "coordinator" | "volunteer" | "donor" | "beneficiary";

interface UserDto {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export type { UserDto, UserRole };
