import express from "express";
import * as productController from "../controllers/product.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import roleMiddleware from "../middlewares/role.middleware.js";
import upload from "../utils/upload.js";

const router = express.Router();

//public routes
router.get("/list", authMiddleware, productController.getAll);
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
  upload.single("image"),
  productController.update
);
router.delete(
  "/delete/:id",
  authMiddleware,
  roleMiddleware("admin"),
  productController.remove
);

router.post(
  "/upload",
  authMiddleware,
  roleMiddleware("admin"),
  upload.single("image"),
  productController.uploadImage
);

export default router;
