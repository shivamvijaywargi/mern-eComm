import asyncHandler from "../utils/asyncHandler.js";
import User from "../models/user.model.js";

/******************************************************
 * @REGISTER
 * @route http://localhost:5000/api/register
 * @description User register Controller for creating new user
 ******************************************************/
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

  // Generate JWT token
  const token = await user.getJWTToken();

  // We do not want to send the password to frontend so setting it as undefined
  user.password = undefined; // This won't change it in DB since this is after we created the user

  // Send response to user with success message
  res.status(201).json({
    success: true,
    message: "user registered successfully",
    user,
    token,
  });
});

/******************************************************
 * @LOGIN
 * @route http://localhost:5000/api/login
 * @description User login Controller for loggin in existing user
 ******************************************************/
export const loginUser = asyncHandler(async (req, res) => {
  // Destructuring the required fields from req.body
  const { email, password } = req.body;

  // Check if email and password is not empty
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "All the fields are required",
    });
  }

  // Check if user exists
  const user = await User.findOne({ email }).select("+password");

  // if no user found send message
  if (!user) {
    return res.status(400).json({
      success: false,
      message: "Email or password does not match or exist",
    });
  }

  // Compare the user password with hashed password
  const isPasswordmatch = await user.comparePassword(password);

  // Check of the password match or not
  if (!isPasswordmatch) {
    return res.status(400).json({
      success: false,
      message: "Email or password does not match or exist",
    });
  }

  // Generate JWT token if all good
  const token = await user.getJWTToken();

  // We do not want to send the password to frontend so setting it as undefined
  user.password = undefined; // This won't change it in DB since this is after we created the user

  res.status(200).json({
    success: true,
    message: "User logged in successfully",
    user,
    token,
  });
});

export const secretRoute = async (req, res) => {
  res.send("Secret");
};
