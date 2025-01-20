import mongoose, { Schema, Document } from "mongoose";

// Interface for Friend Request
interface IFriendRequest extends Document {
  requestTo: mongoose.Types.ObjectId;
  requestFrom: mongoose.Types.ObjectId;
  requestStatus: string;
  createdAt: Date;
  updatedAt: Date;
}

// Schema for Friend Request
const requestSchema = new Schema<IFriendRequest>(
  {
    requestTo: { type: Schema.Types.ObjectId, ref: "Users", required: true },
    requestFrom: { type: Schema.Types.ObjectId, ref: "Users", required: true },
    requestStatus: { type: String, default: "Pending" },
  },
  { timestamps: true }
);

const FriendRequest = mongoose.model<IFriendRequest>(
  "FriendRequest",
  requestSchema
);

export default FriendRequest;
