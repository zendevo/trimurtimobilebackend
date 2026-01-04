import express from "express";
import { healthCheck } from "../controllers/health.controller.js";
import authRoutes from "./auth.routes.js";
import adminRoutes from "./admin.routes.js";
import userRoutes from "./user.routes.js";

const router = express.Router();

router.get("/health", healthCheck);
router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/admin", adminRoutes);

export default router;
