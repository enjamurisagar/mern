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
      default: ["", "", ""],
    },
    size: {
      type: Number,
    },
    reviews: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("products", productSchema);

export default Product;
