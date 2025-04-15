const mongoose = require("mongoose");

const itineraryItemSchema = new mongoose.Schema({
  time: String,
  description: String,
  date: Date,
});

const packingItemSchema = new mongoose.Schema({
  text: String,
  checked: Boolean,
});

const tripSchema = new mongoose.Schema({
  name: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  description: String,
  location: String,
  coverImage: {
    fileName: String,
    url: String,
  },
  images: [
    {
      fileName: String,
      url: String,
    },
  ],
  itinerary: [itineraryItemSchema],
  packingList: [packingItemSchema],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Trip", tripSchema);
