import slugify from "slugify";

import asyncHandler from "../utils/asyncHandler.js";
import Category from "../models/category.model.js";

export const createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;

  // Check if name is not empty
  if (!name.trim()) {
    return res.status(400).json({
      success: false,
      message: "Name is required",
    });
  }

  // Check if category already exists
  const categoryExists = await Category.findOne({ name });

  // If category exists throw message
  if (categoryExists) {
    return res.status(400).json({
      success: false,
      message: "Category already Exists",
    });
  }

  // Creating the slug using slugify package
  const slug = slugify(name);

  // Creating a category and saving it to DB
  const category = await Category.create({ name, slug });

  res.status(201).json({
    success: true,
    message: "Category created successfully",
    category,
  });
});
