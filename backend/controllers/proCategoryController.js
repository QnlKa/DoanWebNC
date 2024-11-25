import ProCategory from "../models/ProCategorySchema.js";
export const createProCategory = async (req, res) => {
  const { title } = req.body;
  try {
    const proCategory = new ProCategory({
      title,
    });
    await ProCategory.create(proCategory);
    res.status(200).json({
      success: true,
      message: "user successfull created",
      data: proCategory,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Internal Server Error" + error });
  }
};
export const getAllCategory = async (req, res) => {
  try {
    const categories = await ProCategory.find({});
    res.status(200).json({
      success: true,
      message: "Categories Found",
      data: categories,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Not Category Found",
    });
  }
};
export const deleteCategory = async (req, res) => {
  const id = req.params.id;
  try {
    await ProCategory.findByIdAndDelete(id);
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
