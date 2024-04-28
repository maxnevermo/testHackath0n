const mongoose = require("mongoose");

const performerSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    default: 0,
  },
  reviews: {
    type: Number,
    default: 0,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  categories: {
    type: [String],
    required: true,
  },
  location: {
    type: String,
    default: "---",
  },
  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
    },
  ],
});

module.exports = mongoose.model("Performer", performerSchema);
