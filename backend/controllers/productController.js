import Product from "../models/ProductSchema.js";
export const createProduct = async (req, res) => {
  const { title, description, price, category, brand, quantity, images } =
    req.body;
  try {
    const product = new Product({
      title,
      description,
      price,
      category,
      brand,
      quantity,
      images,
    });
    await Product.create(product);
    res.status(200).json({
      success: true,
      message: "user successfull created",
      data: product,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Internal Server Error" + error });
  }
};
export const updateProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const updateProduct = await Product.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Successfully updated",
      data: updateProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to updated",
    });
  }
};
export const deleteProduct = async (req, res) => {
  const id = req.params.id;
  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Successfully deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete",
    });
  }
};
export const getSingleProduct = async (req, res) => {
  const id = req.params.id;
  console.log("🚀 ~ getSingleProduct ~ id:", id);
  try {
    const product = await Product.findById(id);
    res.status(200).json({
      success: true,
      message: "Product Found",
      data: product,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "No Product Found",
    });
  }
};
export const getAllProduct = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({
      success: true,
      message: "Products Found",
      data: products,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Not Product Found",
    });
  }
};
export const getSoldProduct = async (req, res) => {
  try {
    const products = await Product.find({}).sort({ sold: -1 }).limit(6);

    res.status(200).json({
      success: true,
      message: "Products Found",
      data: products,
    });


  } catch (error) {
    res.status(404).json({
      success: false,
      message: "No Products Found",
    });
  }
};
