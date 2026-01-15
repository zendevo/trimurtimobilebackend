import express from "express";
import { register, login, refresh } from "../controllers/auth.controller.js";

const router = express.Router();
router.use("/register", register);
router.use("/login", login);
router.use("/refresh", refresh);

export default router;
