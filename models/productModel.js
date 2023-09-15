import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    category: {
      required: true,
      type: String,
    },
    productName: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      default: 0,
    },
    productDescription: {
      type: String,
      default: "",
    },
    productImage: {
      type: Array,
      required: true,
    },
    size: {
      type: Number,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model(productSchema);

export default Product;
