const mongoose = require("mongoose");

const CardSchema = new mongoose.Schema({
  sectionId: { type: mongoose.Schema.Types.ObjectId, ref: "Section", required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  imagePath: { type: String }, 
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Card", CardSchema);
