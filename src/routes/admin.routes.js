import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import roleMiddleware from "../middlewares/role.middleware.js";
import { adminDashboard } from "../controllers/admin.controller.js";

const router = express.Router();
router.get(
  "/dashboard",
  authMiddleware,
  roleMiddleware("admin"),
  adminDashboard
);

export default router;
