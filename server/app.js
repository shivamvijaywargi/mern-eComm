import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(morgan("dev"));

// Importing the routes
import authRoutes from "./routes/auth.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import productRoutes from "./routes/product.routes.js";

app.use("/api/v1/users", authRoutes);
app.use("/api/v1", categoryRoutes);
app.use("/api/v1/products", productRoutes);

export default app;
