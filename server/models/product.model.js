import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      maxlenght: [60, "Product name must be less than 60 characters"],
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
      trim: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Product category is required"],
      ref: "Category",
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
    },
    image: {
      data: Buffer,
      contentType: String,
    },
    slug: {
      type: String,
      lowercase: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    quantity: {
      type: Number,
      default: 0,
    },
    sold: {
      type: Number,
      default: 0,
    },
    shipping: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Product", productSchema);
