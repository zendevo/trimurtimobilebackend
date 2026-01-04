import express from "express";
import { healthCheck } from "../controllers/health.controller.js";

const router = express.Router();
console.log("router loaded");
router.get("/health", healthCheck);

export default router;
