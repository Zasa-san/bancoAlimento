import { Schema, model } from "mongoose";

const USER_ROLES = [
  "coordinador",
  "voluntario",
  "donante",
  "beneficiario",
] as const;

type UserRole = (typeof USER_ROLES)[number];

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: USER_ROLES, required: true },
    active: { type: Boolean, default: true },
  },
  { timestamps: true },
);

const User = model("User", userSchema);

export type { UserRole };
export { User };
