import { registerUser, loginUser } from "../services/auth.service.js";
export const register = async (req, res, next) => {
  try {
    const token = await registerUser(req.body);
    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  console.log("req", req);
  try {
    const token = await loginUser(req.body.email, req.body.password);
    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};
