const mongoose = require("mongoose");

const reminderSchema = new mongoose.Schema({
  tripId: { type: mongoose.Schema.Types.ObjectId, ref: "Trip" },
  message: { type: String, required: true },
  date: { type: Date, required: true },
  isNotified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Reminder", reminderSchema);
