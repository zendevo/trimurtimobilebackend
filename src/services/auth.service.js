import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.model.js";

export const registerUser = async (userData) => {
  const existingUser = await User.findOne({ email: userData?.email });
  if (existingUser) {
    throw new Error("User already exists");
  }

  const hasedPassword = await bcrypt.hash(userData?.password, 10);
  const user = await User.create({
    ...userData,
    password: hasedPassword,
  });

  return generateToken(user);
};

export const loginUser = async (email, password) => {
  const user = await User.findOne({ email }).select("+password");
  console.log("user", email);
  console.log("password", password);
  if (!user) {
    throw new Error("Invalid Username and Password");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid Username and Password");
  }
  return generateToken(user);
};

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role, name: user.name, email: user.email },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );
};
