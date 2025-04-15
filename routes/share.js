const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const ShareToken = require("../models/ShareToken");
const Trip = require("../models/Trip");

// Generate shareable link for a trip
router.post("/trips/:tripId", async (req, res) => {
  try {
    const tripId = req.params.tripId;

    // Verify trip exists
    const trip = await Trip.findById(tripId);
    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    const token = crypto.randomBytes(16).toString("hex");
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    await ShareToken.create({
      token,
      tripId,
      expiresAt,
    });

    const shareUrl = `/shared/${token}`;
    res.json({ shareUrl });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating share link", error: error.message });
  }
});

// Get shared trip details
router.get("/shared/:token", async (req, res) => {
  try {
    const shareToken = await ShareToken.findOne({ token: req.params.token });

    if (!shareToken) {
      return res
        .status(404)
        .json({ message: "Share link not found or expired" });
    }

    const trip = await Trip.findById(shareToken.tripId);
    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    res.json(trip);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching shared trip", error: error.message });
  }
});

module.exports = router;
