import Product from "../models/productModel.js";

export const createProduct = async (req, res) => {
  try {
    const {
      category,
      productName,
      price,
      discount,
      productDescription,
      productImage,
      size,
    } = req.body;
    const isProductPresent = await Product.find({ category, productName });
    if (isProductPresent.length) {
      return res.status(401).json({
        msg: "Product already present with same category and product name",
      });
    }

    const newProduct = new Product({
      category,
      productName,
      price,
      discount,
      productDescription,
      productImage,
      size,
    });
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(401).json({ msg: error.message });
  }
};
