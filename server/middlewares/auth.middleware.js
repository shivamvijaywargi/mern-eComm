import jwt from "jsonwebtoken";

import User from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";

// Middleware to check if the user is logged in or not
export const isAuthenticated = asyncHandler(async (req, res, next) => {
  let token;

  // Extracting the token from either the cookies or from the authorization headers
  if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  } else if (req.headers && req.headers.authorization) {
    token = req.headers.authorization.split(" ")[1];
  }

  // If there is no token sending not authorized message
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  // Here we are decoding the JWT token
  const decoded = await jwt.verify(token, process.env.JWT_SECRET);

  // Storing the _id in req.user so we can access it later on
  req.user = decoded._id;

  // Calling next so the execution continues
  next();
});

// Middleware to check if the logged in user is admin or not
export const isAdmin = asyncHandler(async (req, res, next) => {
  // Finding the user via user id, this will be accessbible because of previous middleware
  const user = await User.findById(req.user);

  if (user.role !== 1) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  next();
});
