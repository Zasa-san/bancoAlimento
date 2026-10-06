import { Schema, model } from "mongoose";

const migrationSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    appliedAt: { type: Date, default: Date.now },
  },
  { versionKey: false },
);

const Migration = model("Migration", migrationSchema);

export { Migration };
