const mongoose = require("mongoose");

const shareTokenSchema = new mongoose.Schema({
  token: { type: String, required: true, unique: true },
  tripId: { type: mongoose.Schema.Types.ObjectId, ref: "Trip", required: true },
  expiresAt: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Automatically delete expired tokens
shareTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model("ShareToken", shareTokenSchema);
