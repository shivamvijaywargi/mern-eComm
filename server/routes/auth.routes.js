import express from "express";
import {
  loginUser,
  registerUser,
  secretRoute,
} from "../controllers/auth.controllers.js";
import { isAdmin, isAuthenticated } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/checkAuth", isAuthenticated, (req, res) => {
  res.status(200).json({
    success: true,
    message: "User is authenticated",
  });
});

// Testing
router.get("/secret", isAuthenticated, isAdmin, secretRoute);

export default router;
