import { Request, Response, NextFunction } from "express";
import UserModel from "../models/userModel";
import { compareString, createJWT, hashString } from "../utils/hash";
// import { sendVerificationEmail } from "../utils/sendEmail";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { firstName, lastName, email, password } = req.body;

  // Validate fields
  if (!firstName || !lastName || !email || !password) {
    next("Provide Required Fields!");
    return;
  }

  try {
    const userExist = await UserModel.findOne({ email });

    if (userExist) {
      next("Email Address already exists");
      return;
    }

    const hashedPassword = await hashString(password);

    const user = await UserModel.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashedPassword,
    });
    res.status(201).send(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: (error as Error).message });
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  try {
    // Validate fields
    if (!email || !password) {
      next("Please Provide User Credentials");
      return;
    }

    // Find user by email
    const user = await UserModel.findOne({ email })
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
      next(
        "User email is not verified. Check your email account and verify your email"
      );
      return;
    }

    // Compare password
    const isMatch = await compareString(password, user.password);

    if (!isMatch) {
      next("Invalid email or password");
      return;
    }

    // Remove password before sending response
    user.password = "";

    const token = createJWT(user._id.toString());
    res.status(201).json({
      success: true,
      message: "Login successfully",
      user,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: (error as Error).message });
  }
};
