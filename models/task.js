const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
  },
  category: {
    type: [String],
    required: true,
  },
  deadline: {
    type: Date,
    required: true,
  },
  posted: {
    type: Date,
    default: Date.now,
  },

  format: {
    type: String,
    enum: ["online", "offline"],
    required: true,
  },
  location: {
    type: String, // Only required if format is "offline"
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
  },
  performer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Performer",
    default: null,
  },
  claimed: {
    type: Date,
    default: null,
  },
});

module.exports = mongoose.model("Task", taskSchema);
