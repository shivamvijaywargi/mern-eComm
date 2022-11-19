import asyncHandler from "../utils/asyncHandler.js";
import User from "../models/user.model.js";

export const registerUser = asyncHandler(async (req, res) => {
  // Destructuring the required fields from req.body
  const { name, email, password } = req.body;

  // Check if name, email and password is not empty
  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "All the fields are required",
    });
  }
  // Check if email already registered
  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({
      success: false,
      message: "Email already exist",
    });
  }

  // Check if password length < 8
  if (password.length < 8) {
    return res.status(400).json({
      success: false,
      message: "Password must be atleast 8 characters long",
    });
  }

  // If all checks passed create user
  const user = await User.create({
    name,
    email,
    password,
  });

  // We do not want to send the password to frontend so setting it as undefined
  user.password = undefined; // This won't change it in DB since this is after we created the user

  // Send response to user with success message
  res.status(201).json({
    success: true,
    message: "user registered successfully",
    user,
  });
});
