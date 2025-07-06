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

module.exports = subCategoryController;
