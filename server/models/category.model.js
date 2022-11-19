import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Category name is required"],
    trim: true,
    maxlength: [32, "Category name must be less than 32 characters"],
    unique: true,
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true,
  },
  description: {
    type: String,
    maxlength: [160, "Description must be less than 160 characters"],
    trim: true,
  },
});

export default mongoose.model("Category", categorySchema);
