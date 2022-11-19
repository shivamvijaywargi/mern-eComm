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

  product.image = undefined;

  res.status(201).json({
    success: true,
    message: "Product created successfully",
    product,
  });
});

/******************************************************
 * @ALLPRODUCTS
 * @route http://localhost:5000/api/v1/product/allProducts
 * @method GET
 * @description Product Controller for getting all products
 ******************************************************/
export const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find()
    .populate("category createdBy")
    .select("-image")
    .limit(12) // To get only 12 items on request
    .sort({ createdAt: -1 }); // -1 means descending (Newest first)

  res.status(200).json({
    success: false,
    message: "All products",
    products,
  });
});

/******************************************************
 * @GETSINGLEPRODUCT
 * @route http://localhost:5000/api/v1/product/:slug
 * @method GET
 * @description Product Controller for getting single product
 ******************************************************/
export const getSingleProduct = asyncHandler(async (req, res) => {
  const { slug } = req.params;

  const product = await Product.findOne({ slug })
    .select("-image")
    .populate("category createdBy");

  res.status(200).json({
    success: true,
    message: "Product found",
    product,
  });
});

/******************************************************
 * @GETIMAGE
 * @route http://localhost:5000/api/v1/product/image/:productId
 * @method GET
 * @description Product Controller for getting product image
 ******************************************************/
export const getImage = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.productId).select("image");

  if (!product.image.data) {
    return res.status(404).json({
      success: false,
      message: "No image found",
    });
  }

  res
    .status(200)
    .set("Content-Type", product.image.contentType)
    .send(product.image.data);
});

/******************************************************
 * @DELETEPRODUCT
 * @route http://localhost:5000/api/v1/product/delete/:productId
 * @method DELETE
 * @description Product Controller for deleting a product
 ******************************************************/
export const deleteProduct = asyncHandler(async (req, res) => {
  const { productId } = req.params;

  const product = await Product.findByIdAndDelete(productId).select("-photo");

  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
    product,
  });
});

/******************************************************
 * @UPDATEPRODUCT
 * @route http://localhost:5000/api/v1/product/update/:productId
 * @method PUT
 * @description Product Controller for updating a product
 ******************************************************/
export const updateProduct = asyncHandler(async (req, res) => {
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

  const product = await Product.findByIdAndUpdate(
    req.params.productId,
    {
      name,
      description,
      price,
      quantity,
      category,
      shipping,
      image,
      createdBy: req.user,
      slug: slugify(name),
    },
    {
      new: true,
    }
  );

  if (image) {
    product.image.data = fs.readFileSync(image.path);
    product.image.contentType = image.type;
  }

  await product.save();

  product.image = undefined;

  res.status(201).json({
    success: true,
    message: "Product created successfully",
    product,
  });
});
