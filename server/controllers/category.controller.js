import slugify from "slugify";

import asyncHandler from "../utils/asyncHandler.js";
import Category from "../models/category.model.js";

/******************************************************
 * @CREATECATEGORY
 * @route http://localhost:5000/api/category
 * @method POST
 * @description Create category Controller for creating a category
 ******************************************************/
export const createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;

  // Check if name is not empty
  if (!name) {
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

/******************************************************
 * @UPDATECATEGORY
 * @route http://localhost:5000/api/category/:id
 * @method PUT
 * @description Update category Controller for updating a category
 ******************************************************/
export const updateCategory = asyncHandler(async (req, res) => {
  const { categoryId } = req.params;
  const { name } = req.body;

  // Check if name is not empty
  if (!name) {
    return res.status(400).json({
      success: false,
      message: "Name is required",
    });
  }

  // Creating the slug using slugify package
  const slug = slugify(name);

  // Update category
  const updateCategory = await Category.findByIdAndUpdate(categoryId, {
    name,
    slug,
  });

  res.status(200).json({
    success: true,
    message: "Category updated successfully",
    updateCategory,
  });
});

/******************************************************
 * @DELETECATEGORY
 * @route http://localhost:5000/api/category/:id
 * @method DELETE
 * @description Delete category Controller for deleting a category
 ******************************************************/
export const deleteCategory = asyncHandler(async (req, res) => {
  const { categoryId } = req.params;

  // Finding the category by ID and deleting it
  const deletedCategory = await Category.findByIdAndDelete(categoryId);

  res.status(200).json({
    success: true,
    message: "Category deleted successfully",
    deletedCategory,
  });
});

/******************************************************
 * @GETALLCATEGORY
 * @route http://localhost:5000/api/categories
 * @method GET
 * @description category Controller for getting all the categories
 ******************************************************/
export const getAllCategories = asyncHandler(async (req, res) => {
  // Finding all the categories from the DB
  const categories = await Category.find();

  res.status(200).json({
    success: true,
    message: "Fetched All categories",
    categories,
  });
});

/******************************************************
 * @GETSINGLECATEGORY
 * @route http://localhost:5000/api/category/:id
 * @method GET
 * @description category Controller for getting a single category
 ******************************************************/
export const getSingleCategory = asyncHandler(async (req, res) => {
  const { slug } = req.params;

  const singleCategory = await Category.findOne({ slug });

  res.status(200).json({
    success: true,
    message: "Fetched single category",
    singleCategory,
  });
});
