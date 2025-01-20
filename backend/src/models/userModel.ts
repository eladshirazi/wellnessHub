import mongoose, { Schema, Document } from "mongoose";

// Interface for the user document
interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  location?: string;
  profileUrl?: string;
  profession?: string;
  friends: mongoose.Types.ObjectId[];
  views: string[];
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Schema
const userSchema = new mongoose.Schema<IUser>(
  {
    firstName: {
      type: String,
      required: [true, "First Name is Required!"],
    },
    lastName: {
      type: String,
      required: [true, "Last Name is Required!"],
    },
    email: {
      type: String,
      required: [true, "Email is Required!"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is Required!"],
      minlength: [6, "Password length should be greater than 6 characters"],
      select: true,
    },
    location: { type: String },
    profileUrl: { type: String },
    profession: { type: String },
    friends: [{ type: Schema.Types.ObjectId, ref: "Users" }],
    views: [{ type: String }],
    verified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Users = mongoose.model<IUser>("Users", userSchema);

export default Users;
