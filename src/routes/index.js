import express from "express";
import { healthCheck } from "../controllers/health.controller.js";
import authRoutes from "./auth.routes.js";
const router = express.Router();
console.log("router loaded");
router.get("/health", healthCheck);
router.use("/auth", authRoutes);

export default router;
