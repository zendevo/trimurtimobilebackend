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
  return {
    token: generateToken(user),
    refreshToken: generateRefreshToken(user),
  };
};

export const refreshToken = async (req, res) => {
  const token = req.body.refreshToken;
  if (!token) throw new Error(401);
  return jwt.verify(token, process.env.REFRESH_SECRET, (err, user) => {
    if (err) throw new Error(403);

    const newToken = generateToken(user);
    console.log("newToken", newToken);
    return newToken;
  });
};

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role, name: user.name, email: user.email },
    process.env.JWT_SECRET,
    {
      expiresIn: "2m",
    }
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.REFRESH_SECRET, {
    expiresIn: "1d",
  });
};
