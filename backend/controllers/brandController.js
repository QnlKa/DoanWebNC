import Brand from "../models/BrandSchema.js";
export const createBrand = async (req, res) => {
  const { title } = req.body;
  try {
    const brand = new Brand({
      title,
    });
    await Brand.create(brand);
    res.status(200).json({
      success: true,
      message: "user successfull created",
      data: brand,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Internal Server Error" + error });
  }
};
export const getAllBrand = async (req, res) => {
  try {
    const brands = await Brand.find({});
    res.status(200).json({
      success: true,
      message: "Categories Found",
      data: brands,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Not Category Found",
    });
  }
};
export const deleteBrand = async (req, res) => {
  const id = req.params.id;
  try {
    await Brand.findByIdAndDelete(id);
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
