const categorySchema = require("../models/categorySchema");
const subCategorySchema = require("../models/subCategorySchema");

async function  subCategoryController(req, res) {
    const {name, description, category } = req.body;
    console.log(req.body);
    
    const foundCategory = await categorySchema.findOne({name: category})
 
    // console.log(foundCategory._id);
    
    const subCategory = subCategorySchema({
        name, description, 
        category:foundCategory
    })

    subCategory.save();
     res.status(200).json({
        message: "Create subcategory successfully",
        status: "success",
        data: subCategory,
      });
}

module.exports = subCategoryController