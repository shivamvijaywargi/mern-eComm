import express from "express";

import { createCategory } from "../controllers/category.controller.js";
import { isAdmin, isAuthenticated } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/category", isAuthenticated, isAdmin, createCategory);

export default router;
