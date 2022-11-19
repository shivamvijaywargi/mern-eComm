import express from "express";
import formidable from "express-formidable";

import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getImage,
  getSingleProduct,
  updateProduct,
} from "../controllers/product.controllers.js";
import { isAdmin, isAuthenticated } from "../middlewares/auth.middleware.js";

const router = express.Router();

// NOTE: TO FUTURE ME: When using formidable() do not send form encoded data
router.post("/create", isAuthenticated, isAdmin, formidable(), createProduct);
router.get("/all", getAllProducts);
router.get("/:slug", getSingleProduct);
router.get("/image/:productId", getImage);
router.delete("/delete/:productId", isAuthenticated, isAdmin, deleteProduct);
router.put(
  "/update/:productId",
  isAuthenticated,
  isAdmin,
  formidable(),
  updateProduct
);

export default router;
