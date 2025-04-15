const express = require("express");
const router = express.Router();
const Trip = require("../models/Trip");

// Get all trips
router.get("/", async (req, res) => {
  try {
    const trips = await Trip.find().sort({ createdAt: -1 });
    res.json(trips);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching trips", error: error.message });
  }
});

// Get single trip
router.get("/:id", async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);
    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }
    res.json(trip);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching trip", error: error.message });
  }
});

// Create trip
router.post("/", async (req, res) => {
  try {
    const newTrip = new Trip(req.body);
    const savedTrip = await newTrip.save();
    res.status(201).json(savedTrip);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error creating trip", error: error.message });
  }
});

// Update trip
router.put("/:id", async (req, res) => {
  try {
    const updatedTrip = await Trip.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!updatedTrip) {
      return res.status(404).json({ message: "Trip not found" });
    }
    res.json(updatedTrip);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error updating trip", error: error.message });
  }
});

// Delete trip
router.delete("/:id", async (req, res) => {
  try {
    const deletedTrip = await Trip.findByIdAndDelete(req.params.id);
    if (!deletedTrip) {
      return res.status(404).json({ message: "Trip not found" });
    }
    res.json({ message: "Trip deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting trip", error: error.message });
  }
});

// Add itinerary item
router.post("/:id/itinerary", async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);
    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    trip.itinerary.push({
      time: req.body.time,
      description: req.body.description,
      date: req.body.date,
    });

    await trip.save();
    res.status(201).json(trip.itinerary[trip.itinerary.length - 1]);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error adding itinerary item", error: error.message });
  }
});

// Update itinerary item
router.put("/:id/itinerary/:itemId", async (req, res) => {
  try {
    const trip = await Trip.findOneAndUpdate(
      {
        _id: req.params.id,
        "itinerary._id": req.params.itemId,
      },
      {
        $set: {
          "itinerary.$.time": req.body.time,
          "itinerary.$.description": req.body.description,
          "itinerary.$.date": req.body.date,
        },
      },
      { new: true }
    );

    if (!trip) {
      return res
        .status(404)
        .json({ message: "Trip or itinerary item not found" });
    }

    const updatedItem = trip.itinerary.id(req.params.itemId);
    res.json(updatedItem);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error updating itinerary item", error: error.message });
  }
});

// Delete itinerary item
router.delete("/:id/itinerary/:itemId", async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);
    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    trip.itinerary.pull(req.params.itemId);
    await trip.save();

    res.json({ message: "Itinerary item deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting itinerary item", error: error.message });
  }
});

module.exports = router;
