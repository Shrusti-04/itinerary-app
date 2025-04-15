const express = require("express");
const router = express.Router();
const Trip = require("../models/Trip");

// Get packing list for a trip
router.get("/:tripId", async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.tripId);
    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }
    res.json(trip.packingList);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching packing list", error: error.message });
  }
});

// Add item to packing list
router.post("/:tripId", async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.tripId);
    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    trip.packingList.push({
      text: req.body.text,
      checked: false,
    });

    await trip.save();
    res.status(201).json(trip.packingList[trip.packingList.length - 1]);
  } catch (error) {
    res
      .status(400)
      .json({
        message: "Error adding item to packing list",
        error: error.message,
      });
  }
});

// Update item in packing list
router.put("/:tripId/:itemId", async (req, res) => {
  try {
    const trip = await Trip.findOneAndUpdate(
      { _id: req.params.tripId, "packingList._id": req.params.itemId },
      {
        $set: {
          "packingList.$.text": req.body.text,
          "packingList.$.checked": req.body.checked,
        },
      },
      { new: true }
    );

    if (!trip) {
      return res.status(404).json({ message: "Trip or item not found" });
    }

    const updatedItem = trip.packingList.id(req.params.itemId);
    res.json(updatedItem);
  } catch (error) {
    res
      .status(400)
      .json({
        message: "Error updating packing list item",
        error: error.message,
      });
  }
});

// Delete item from packing list
router.delete("/:tripId/:itemId", async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.tripId);
    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    trip.packingList.pull(req.params.itemId);
    await trip.save();

    res.json({ message: "Item deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error deleting packing list item",
        error: error.message,
      });
  }
});

module.exports = router;
