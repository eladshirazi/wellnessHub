import mongoose, { Schema, Document } from "mongoose";

// Interface for Password Reset
interface IPasswordReset extends Document {
  userId: string;
  email: string;
  token: string;
  createdAt: Date;
  expiresAt: Date;
}

// Schema for Password Reset
const passwordResetSchema = new Schema<IPasswordReset>({
  userId: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  token: { type: String, required: true },
  createdAt: { type: Date, required: true },
  expiresAt: { type: Date, required: true },
});

const PasswordReset = mongoose.model<IPasswordReset>(
  "PasswordReset",
  passwordResetSchema
);

export default PasswordReset;
