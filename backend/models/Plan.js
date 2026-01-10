const mongoose = require("mongoose");

// Place schema (inside a day)
const placeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  mapQuery: {
    type: String,
    required: true,
  },
});

// Day schema
const daySchema = new mongoose.Schema({
  dayNumber: {
    type: Number,
    required: true,
  },
  places: [placeSchema]
});

// Main plan schema
const planSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    budget: {
      type: String,
      required: true,
    },
    days: [daySchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Plan", planSchema);
