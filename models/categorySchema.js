const mongoose = require("mongoose");
const { Schema } = mongoose;

const CategorySchema = new Schema({
  name: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  subCategory: [
   {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SubCategory"
  },
],
});

module.exports = mongoose.model("Category", CategorySchema);
