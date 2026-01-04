import express from "express";
import * as productController from "../controllers/product.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import roleMiddleware from "../middlewares/role.middleware.js";
const router = express.Router();

//public routes
router.get("/list", productController.getAll);
router.get("/:id", productController.getOne);

//Admin only
router.post(
  "/create",
  authMiddleware,
  roleMiddleware("admin"),
  productController.create
);
router.put(
  "/update/:id",
  authMiddleware,
  roleMiddleware("admin"),
  productController.update
);
router.delete(
  "/delete/:id",
  authMiddleware,
  roleMiddleware("admin"),
  productController.remove
);

export default router;
