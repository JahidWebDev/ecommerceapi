const categorySchema = require("../models/categorySchema");

async function categoryController(req, res) {
  const { name, description } = req.body;
  const existiongCategory = await categorySchema.findOne({ name });
  if (existiongCategory) {
    return res.status(200).json({
      message: "This Category already exists",
      status: "success",
    });
  }
  const category = new categorySchema({
    name,
    description,
  });

  category
    .save()
    .then(() => {
      res.status(200).json({
        message: "Category created successfully",
        status: "success",
        data: category,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Failed to create category",
        status: "error",
        error: error.message,
      });
    });
}
async function getAllCategory(req, res) {
  try {
    const allCategory = await categorySchema.find({});
    res.status(200).json({
      message: "Get all category",
      status: "success",
      data: allCategory, // Include data in response
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching categories",
      status: "error",
      error: error.message,
    });
  }
}

async function getSingleCategoryController(req, res) {
  const {id} = req.params;
   
   
  const getSingleCategory = await categorySchema.findOne({_id: id})
  res.status(500).json({
      message: "GetSingleCategory ",
      status: "Success",
      data: getSingleCategory
  })
  
}

module.exports = {categoryController, getAllCategory, getSingleCategoryController};
