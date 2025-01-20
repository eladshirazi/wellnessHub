import mongoose, { Schema, Document } from "mongoose";

// Interface for Email Verification
interface IEmailVerification extends Document {
  userId: string;
  token: string;
  createdAt: Date;
  expiresAt: Date;
}

// Schema for Email Verification
const emailVerificationSchema = new Schema<IEmailVerification>({
  userId: { type: String, required: true },
  token: { type: String, required: true },
  createdAt: { type: Date, required: true },
  expiresAt: { type: Date, required: true },
});

const Verification = mongoose.model<IEmailVerification>(
  "Verification",
  emailVerificationSchema
);

export default Verification;
