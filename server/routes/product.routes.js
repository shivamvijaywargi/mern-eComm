import express from "express";

import { createProduct } from "../controllers/product.controllers.js";
import { isAdmin, isAuthenticated } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/create", isAuthenticated, isAdmin, createProduct);

export default router;
