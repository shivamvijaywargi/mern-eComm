import dotenv from "dotenv";
import express from "express";

dotenv.config();

const app = express();

// Importing the routes
import authRoutes from "./routes/auth.routes.js";

app.use("/api", authRoutes);

export default app;
