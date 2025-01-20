import mongoose, { Schema, Document } from "mongoose";

// Interface for Replies
interface IReply {
  rid: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  from?: string;
  replyAt?: string;
  comment?: string;
  created_At: Date;
  updated_At: Date;
  likes: string[];
}

// Interface for Comments
interface IComment extends Document {
  userId: mongoose.Types.ObjectId;
  postId: mongoose.Types.ObjectId;
  comment: string;
  from: string;
  replies: IReply[];
  likes: string[];
  createdAt: Date;
  updatedAt: Date;
}

// Schema for Replies
const replySchema = new mongoose.Schema<IReply>({
  rid: { type: mongoose.Schema.Types.ObjectId, required: true },
  userId: { type: Schema.Types.ObjectId, ref: "Users", required: true },
  from: { type: String },
  replyAt: { type: String },
  comment: { type: String },
  created_At: { type: Date, default: Date.now },
  updated_At: { type: Date, default: Date.now },
  likes: [{ type: String }],
});

// Schema for Comments
const commentSchema = new mongoose.Schema<IComment>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "Users", required: true },
    postId: { type: Schema.Types.ObjectId, ref: "Posts", required: true },
    comment: { type: String, required: true },
    from: { type: String, required: true },
    replies: [replySchema],
    likes: [{ type: String }],
  },
  { timestamps: true }
);

const Comments = mongoose.model<IComment>("Comments", commentSchema);

export default Comments;
