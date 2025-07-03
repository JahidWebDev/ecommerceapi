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
  const { id } = req.params;

  const getSingleCategory = await categorySchema.findOne({ _id: id });
  res.status(500).json({
    message: "GetSingleCategory ",
    status: "Success",
    data: getSingleCategory,
  });
}

async function updateSingleCategoryController(req, res) {
  try {
    const { id } = req.params;
    console.log(id);

    const { name, description } = req.body;
    const updateCategory = await categorySchema.findById(id);
    if (!name) {
      updateCategory.name = name;
    }else if(name){
      updateCategory.name = name;
    }
    if (description) {
      updateCategory.description = description;
    }else if(!description){
      updateCategory.name = name;
    }
    await updateCategory.save();
    res.status(201).json({
      message: "Category update Successful",
      status: "Success",
      data: updateCategory,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      status: "error",
      error: error.message,
    });
  }
}

module.exports = {
  categoryController,
  getAllCategory,
  getSingleCategoryController,
  updateSingleCategoryController,
};
