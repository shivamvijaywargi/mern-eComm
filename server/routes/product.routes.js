import express from "express";
import formidable from "express-formidable";

import { createProduct } from "../controllers/product.controllers.js";
import { isAdmin, isAuthenticated } from "../middlewares/auth.middleware.js";

const router = express.Router();

// NOTE: TO FUTURE ME: When using formidable() do not send form encoded data
router.post("/create", isAuthenticated, isAdmin, formidable(), createProduct);

export default router;
