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
exports.login = exports.register = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const hash_1 = require("../utils/hash");
// import { sendVerificationEmail } from "../utils/sendEmail";
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, email, password } = req.body;
    // Validate fields
    if (!firstName || !lastName || !email || !password) {
        next("Provide Required Fields!");
        return;
    }
    try {
        const userExist = yield userModel_1.default.findOne({ email });
        if (userExist) {
            next("Email Address already exists");
            return;
        }
        const hashedPassword = yield (0, hash_1.hashString)(password);
        const user = yield userModel_1.default.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hashedPassword,
        });
        res.status(201).send(user);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});
exports.register = register;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        // Validate fields
        if (!email || !password) {
            next("Please Provide User Credentials");
            return;
        }
        // Find user by email
        const user = yield userModel_1.default.findOne({ email })
            .select("+password")
            .populate({
            path: "friends",
            select: "firstName lastName location profileUrl -password",
        });
        if (!user) {
            next("Invalid email or password");
            return;
        }
        if (!user.verified) {
            next("User email is not verified. Check your email account and verify your email");
            return;
        }
        // Compare password
        const isMatch = yield (0, hash_1.compareString)(password, user.password);
        if (!isMatch) {
            next("Invalid email or password");
            return;
        }
        // Remove password before sending response
        user.password = "";
        const token = (0, hash_1.createJWT)(user._id.toString());
        res.status(201).json({
            success: true,
            message: "Login successfully",
            user,
            token,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});
exports.login = login;
