import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));

// Importing the routes
import authRoutes from "./routes/auth.routes.js";

app.use("/api", authRoutes);

export default app;
