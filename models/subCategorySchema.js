const mongoose = require("mongoose");
const { Schema } = mongoose;

const SubCategorySchema = new Schema({
  name: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true
  }
});

module.exports = mongoose.model("SubCategory", SubCategorySchema);
