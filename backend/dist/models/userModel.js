"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
// Schema
const userSchema = new Schema({
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
}, { timestamps: true });
const UserModel = mongoose_1.default.model("Users", userSchema);
exports.default = UserModel;
