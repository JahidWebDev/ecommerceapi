const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true,],
    },
    description: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      required: [true,],
      min: [0,],
    },
    brand: {
      type: String,
      trim: true, 
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    subCategory: {
      type: Schema.Types.ObjectId,
      ref: "SubCategory",
      required: true,
    },
    color: {
      type: String,
      trim: true,
    }, 
    storage: {
      type: String,
      trim: true,
    },
    ram: {
      type: String,
      trim: true,
    },
    size: {
      type: String,
      trim: true,
    },
   images: {
  type: [String], // array of strings for multiple images
  default: []
},
    inStock: {
      type: Boolean,
      default: true,
    },
    quantity: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
