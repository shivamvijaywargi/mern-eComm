import asyncHandler from "../utils/asyncHandler.js";

/******************************************************
 * @CREATEPRODUCT
 * @route http://localhost:8000/api/v1/product/create
 * @method POST
 * @description Product Controller for creating new product
 ******************************************************/
export const createProduct = asyncHandler(async (req, res) => {
  const { name, description, price } = req.body;

  if (!name) res.send("Product created");
});
