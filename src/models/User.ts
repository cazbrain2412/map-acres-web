import mongoose, { Schema, models, model } from "mongoose";

export type UserRole = "owner" | "agent" | "admin";

const UserSchema = new Schema(
  {
    role: { type: String, enum: ["owner", "agent", "admin"], required: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    phone: { type: String, default: "", trim: true },
    passwordHash: { type: String, required: true },
    verified: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default models.User || model("User", UserSchema);

