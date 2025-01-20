import mongoose, { Schema, Document } from "mongoose";

// Interface for the Post document
interface IPost extends Document {
  userId: mongoose.Types.ObjectId;
  description: string;
  image?: string;
  likes: string[];
  comments: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

// Schema
const postSchema = new mongoose.Schema<IPost>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "Users", required: true },
    description: { type: String, required: true },
    image: { type: String },
    likes: [{ type: String }],
    comments: [{ type: Schema.Types.ObjectId, ref: "Comments" }],
  },
  { timestamps: true }
);

const Posts = mongoose.model<IPost>("Posts", postSchema);

export default Posts;
