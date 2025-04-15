const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();
const config = require("./config");

const app = express();

// Serve uploaded files from local directory
app.use(
  "/uploads",
  express.static(path.join(__dirname, process.env.UPLOAD_DIR || "uploads"))
);

// Serve static files in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client", "build")));

  // Handle React routing
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

// MongoDB Connection with retry logic for Glitch
const connectWithRetry = async () => {
  try {
    await mongoose.connect(config.mongoUri);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    console.log("Retrying in 5 seconds...");
    setTimeout(connectWithRetry, 5000);
  }
};

connectWithRetry();

// Security and Middleware
app.use(cors(config.cors));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Security headers
app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  next();
});

// Routes
const tripRoutes = require("./routes/trips");
const weatherRoutes = require("./routes/weather");
const packingRoutes = require("./routes/packing");
const shareRoutes = require("./routes/share");
const mediaRoutes = require("./routes/media");

// Request logging
const {
  requestLogger,
  errorHandler,
  notFound,
} = require("./middleware/error-handlers");
const logger = require("./utils/logger");

app.use(requestLogger);

// API Routes
app.use("/api/trips", tripRoutes);
app.use("/api/weather", weatherRoutes);
app.use("/api/packing", packingRoutes);
app.use("/api/share", shareRoutes);
app.use("/api/media", mediaRoutes);

// Handle 404s
app.use(notFound);

// Error handling
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
