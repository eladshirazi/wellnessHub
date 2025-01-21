import mongoose from "mongoose";
const Schema = mongoose.Schema;
// Interface for the user document
export interface IUser {
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
const userSchema = new Schema<IUser>(
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

const UserModel = mongoose.model<IUser>("Users", userSchema);

export default UserModel;
