const uploadImage = require("../middleware/cloudinary");
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
    inStock,
    quantity,
    category,
    subCategory,
  } = req.body;

  try {
    if (!req.file) {
      return res.status(400).json({ message: "Image file is required" });
    }

    const imgPath = req.file.path;
    const imgUrl = await uploadImage(imgPath);
    const Product = new productSchema({
      name,
      description,
      price,
      brand,
      color,
      storage,
      ram,
      size,
      images: [imgUrl.secure_url],
      inStock,
      quantity,
      category,
      subCategory,
    });

    await Product.save();

    res.status(201).json({
      message: "Product created successfully",
      status: "success",
      data: Product,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({
      message: "Error creating product",
      status: "error",
    });
  }
}

module.exports = createProductController;
