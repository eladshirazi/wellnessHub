import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";

// Function to hash a string
export const hashString = async (useValue: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(useValue, salt);
  return hashedPassword;
};

// Function to compare two strings
export const compareString = async (
  userPassword: string,
  password: string
): Promise<boolean> => {
  const isMatch = await bcrypt.compare(userPassword, password);
  return isMatch;
};

// Function to create a JSON Web Token
export function createJWT(id: string): string {
  if (!process.env.JWT_SECRET_KEY) {
    throw new Error(
      "JWT_SECRET_KEY is not defined in the environment variables."
    );
  }
  return JWT.sign({ userId: id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1d",
  });
}
