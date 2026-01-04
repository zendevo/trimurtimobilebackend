import express from "express";
import { register, login } from "../controllers/auth.controller.js";

const router = express.Router();
router.use("/register", register);
router.use("/login", login);

export default router;
