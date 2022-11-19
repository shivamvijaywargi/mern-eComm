import express from "express";

import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getSingleCategory,
  updateCategory,
} from "../controllers/category.controller.js";
import { isAdmin, isAuthenticated } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.route("/create", isAuthenticated, isAdmin).post(createCategory);
router.put("/update/:categoryId", isAuthenticated, isAdmin, updateCategory);
router.delete("/delete/:categoryId", isAuthenticated, isAdmin, deleteCategory);
router.get("/all", getAllCategories);
router.get("/:slug", getSingleCategory);

export default router;
