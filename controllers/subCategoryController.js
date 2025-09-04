const categorySchema = require("../models/categorySchema");
const subCategorySchema = require("../models/subCategorySchema");

async function subCategoryController(req, res) {
  const { name, description, category } = req.body;
  console.log(req.body);

  try {
    const foundCategory = await categorySchema.findOneAndUpdate({ name: category });

    const subCategorys = new subCategorySchema({
      name,
      description,
      category: foundCategory._id,
    });

    await subCategorys.save();

    await categorySchema.findOneAndUpdate(
      { _id: foundCategory._id },
      { $push: { subCategory: subCategorys._id } },
      { new: true }
    );
    res.status(200).json({
      message: "Create subcategory successfully",
      status: "success",
      data: subCategorys,
    });
  } catch (err) {
    console.error("Error creating subcategory:", err.message);
    res.status(500).json({
      status: "error",
      message: "Server error",
      error: err.message,
    });
  }
}


async function deleteSubCategoryControllers(req, res) {
  const { id } = req.params;

  try {
    const deletesubCategory = await subCategorySchema.findByIdAndDelete(id);

    if (!deletesubCategory) {
      return res.status(404).json({
        status: "error",
        message: "Subcategory not found",
      });
    }

    // Remove subcategory reference from Category
    await categorySchema.findByIdAndUpdate(
      subCategory.category,
      { $pull: { subCategory: subCategory._id } }
    );

    res.status(200).json({
      message: "Subcategory deleted successfully",
      status: "success",
    });
  } catch (err) {
    console.error("Error deleting subcategory:", err.message);
    res.status(500).json({
      status: "error",
      message: "Server error",
      error: err.message,
    });
  }
}

async function getAllSubCategories(req, res) {
  try {
    const subCategories = await subCategorySchema.find().populate("category");
    res.status(200).json({
      status: "success",
      data: subCategories,
    });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
}
module.exports = {
  subCategoryController,
  deleteSubCategoryControllers,
  getAllSubCategories

};
