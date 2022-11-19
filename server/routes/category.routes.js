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

router.route("/category", isAuthenticated, isAdmin).post(createCategory);
router
  .route("/category/:categoryId", isAuthenticated, isAdmin)
  .put(updateCategory)
  .delete(deleteCategory);
router.get("/categories", getAllCategories);
router.get("/category/:slug", getSingleCategory);

export default router;
