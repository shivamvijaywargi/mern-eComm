import fs from "fs";

import slugify from "slugify";

import Product from "../models/product.model.js";
import asyncHandler from "../utils/asyncHandler.js";

/******************************************************
 * @CREATEPRODUCT
 * @route http://localhost:5000/api/v1/product/create
 * @method POST
 * @description Product Controller for creating a new product
 ******************************************************/
export const createProduct = asyncHandler(async (req, res) => {
  const { name, description, price, quantity, category, shipping } = req.fields;

  const { image } = req.files;

  if (!name) {
    return res.status(400).json({
      success: false,
      message: "Product name is required",
    });
  }

  if (!description) {
    return res.status(400).json({
      success: false,
      message: "Product description is required",
    });
  }

  if (!price) {
    return res.status(400).json({
      success: false,
      message: "Product price is required",
    });
  }

  if (!quantity) {
    return res.status(400).json({
      success: false,
      message: "Product quantity is required",
    });
  }

  if (!category) {
    return res.status(400).json({
      success: false,
      message: "Product category is required",
    });
  }

  if (!shipping) {
    return res.status(400).json({
      success: false,
      message: "Product shipping is required",
    });
  }

  if (image && image.size > 1000000) {
    return res.status(400).json({
      success: false,
      message: "Image cannot be greater than 1mb",
    });
  }

  const product = await Product.create({
    name,
    description,
    price,
    quantity,
    category,
    shipping,
    image,
    createdBy: req.user,
    slug: slugify(name),
  });

  if (image) {
    product.image.data = fs.readFileSync(image.path);
    product.image.contentType = image.type;
  }

  await product.save();

  res.status(201).json({
    success: true,
    message: "Product created successfully",
    product,
  });
});
