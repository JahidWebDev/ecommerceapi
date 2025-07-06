const productSchema = require("../models/productSchema");

async function createProductController(req, res) {
  const {
    name,
    description,
    price,
    brand,
    color,
    storage,
    ram,
    size,
    images,
    inStock,
    quantity,
    category,
    subCategory,
  } = req.body;
console.log(req.body);

  try {
    const Product = new productSchema({
      name,
      description,
      price,
      brand,
      color,
      storage,
      ram,
      size,
      images,
      inStock,
      quantity,
      category,
      subCategory
    });
        
    await Product.save();

    res.status(201).json({
      message: "Product created successfully",
      status: "success",
      data: Product,
    });

  } catch (error) {
    res.status(500).json({
      message: "Error creating product",
      status: "error",
      
    });
  }
}

module.exports = createProductController;
