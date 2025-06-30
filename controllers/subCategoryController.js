const categorySchema = require("../models/categorySchema");
const subCategorySchema = require("../models/subCategorySchema");

async function subCategoryController(req, res) {
  console.log("ok cool");

  const { name, description, category } = req.body;
  console.log(req.body);

  try {
    const foundCategory = await categorySchema.findOne({ name: category });

    const subCategory = new subCategorySchema({
      name,
      description,
      category: foundCategory._id,
    });

    await subCategory.save();

    res.status(200).json({
      message: "Create subcategory successfully",
      status: "success",
      data: subCategory,
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

module.exports = subCategoryController;

