import express from "express";
import { users } from "../controllers/auth.controllers.js";

const router = express.Router();

router.get("/users", users);

export default router;
