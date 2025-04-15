const express = require("express");
const router = express.Router();
const axios = require("axios");

// Get weather data for a location
router.get("/:location", async (req, res) => {
  try {
    const apiKey = process.env.WEATHER_API_KEY;
    const location = req.params.location;

    if (!apiKey) {
      return res.status(500).json({
        message: "Weather API key not configured",
      });
    }

    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
        location
      )}&appid=${apiKey}&units=imperial`
    );

    const weatherData = {
      temperature: Math.round(response.data.main.temp),
      conditions: response.data.weather[0].main.toLowerCase(),
      description: response.data.weather[0].description,
      humidity: response.data.main.humidity,
      windSpeed: response.data.wind.speed,
    };

    res.json({
      message: `Weather data for ${location}`,
      data: weatherData,
    });
  } catch (error) {
    console.error("Weather API error:", error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      message: "Error fetching weather data",
      error: error.response?.data?.message || error.message,
    });
  }
});

module.exports = router;
