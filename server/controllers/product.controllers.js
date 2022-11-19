import asyncHandler from "../utils/asyncHandler.js";

export const createProduct = asyncHandler(async (req, res) => {
  res.send("Product created");
});
