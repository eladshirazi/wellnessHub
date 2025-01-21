"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordLink = exports.sendVerificationEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
const uuid_1 = require("uuid");
const hash_1 = require("./hash");
const emailVerificationModel_1 = __importDefault(require("../models/emailVerificationModel"));
const passwordResetModel_1 = __importDefault(require("../models/passwordResetModel"));
dotenv_1.default.config();
const { AUTH_EMAIL, AUTH_PASS, APP_URL } = process.env;
// Transporter setup
const transporter = nodemailer_1.default.createTransport({
    host: "smtp-mail.outlook.com",
    auth: {
        user: AUTH_EMAIL,
        pass: AUTH_PASS,
    },
});
const sendVerificationEmail = (user, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id, email, lastName } = user;
    const token = _id + (0, uuid_1.v4)();
    const link = `${APP_URL}users/verify/${_id}/${token}`;
    // Mail options
    const mailOptions = {
        from: AUTH_EMAIL,
        to: email,
        subject: "Email Verification",
        html: `<div
    style='font-family: Arial, sans-serif; font-size: 20px; color: #333; background-color: #f7f7f7; padding: 20px; border-radius: 5px;'>
    <h3 style="color: rgb(8, 56, 188)">Please verify your email address</h3>
    <hr>
    <h4>Hi ${lastName || "User"},</h4>
    <p>
        Please verify your email address so we can know that it's really you.
        <br>
    <p>This link <b>expires in 1 hour</b></p>
    <br>
    <a href=${link}
        style="color: #fff; padding: 14px; text-decoration: none; background-color: #000;  border-radius: 8px; font-size: 18px;">Verify
        Email Address</a>
    </p>
    <div style="margin-top: 20px;">
        <h5>Best Regards</h5>
        <h5>ShareFun Team</h5>
    </div>
</div>`,
    };
    try {
        const hashedToken = yield (0, hash_1.hashString)(token);
        const newVerifiedEmail = yield emailVerificationModel_1.default.create({
            userId: _id,
            token: hashedToken,
            createdAt: Date.now(),
            expiresAt: Date.now() + 3600000, // 1 hour
        });
        if (newVerifiedEmail) {
            transporter
                .sendMail(mailOptions)
                .then(() => {
                res.status(201).send({
                    success: "PENDING",
                    message: "Verification email has been sent to your account. Check your email for further instructions.",
                });
            })
                .catch((err) => {
                console.error(err);
                res.status(404).json({ message: "Something went wrong" });
            });
        }
    }
    catch (error) {
        console.error(error);
        res.status(404).json({ message: "Something went wrong" });
    }
});
exports.sendVerificationEmail = sendVerificationEmail;
const resetPasswordLink = (user, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id, email } = user;
    const token = _id + (0, uuid_1.v4)();
    const link = `${APP_URL}users/reset-password/${_id}/${token}`;
    // Mail options
    const mailOptions = {
        from: AUTH_EMAIL,
        to: email,
        subject: "Password Reset",
        html: `<p style="font-family: Arial, sans-serif; font-size: 16px; color: #333; background-color: #f7f7f7; padding: 20px; border-radius: 5px;">
         Password reset link. Please click the link below to reset password.
        <br>
        <p style="font-size: 18px;"><b>This link expires in 10 minutes</b></p>
         <br>
        <a href=${link} style="color: #fff; padding: 10px; text-decoration: none; background-color: #000;  border-radius: 8px; font-size: 18px; ">Reset Password</a>.
    </p>`,
    };
    try {
        const hashedToken = yield (0, hash_1.hashString)(token);
        const resetEmail = yield passwordResetModel_1.default.create({
            userId: _id,
            email,
            token: hashedToken,
            createdAt: Date.now(),
            expiresAt: Date.now() + 600000, // 10 minutes
        });
        if (resetEmail) {
            transporter
                .sendMail(mailOptions)
                .then(() => {
                res.status(201).send({
                    success: "PENDING",
                    message: "Reset Password Link has been sent to your account.",
                });
            })
                .catch((err) => {
                console.error(err);
                res.status(404).json({ message: "Something went wrong" });
            });
        }
    }
    catch (error) {
        console.error(error);
        res.status(404).json({ message: "Something went wrong" });
    }
});
exports.resetPasswordLink = resetPasswordLink;
