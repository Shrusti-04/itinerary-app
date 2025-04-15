import React, { useState, useEffect } from "react";
import { Paper, Typography, Box, CircularProgress } from "@mui/material";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import CloudIcon from "@mui/icons-material/Cloud";
import axios from "axios";

const WeatherDisplay = ({ location }) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      if (!location) return;

      try {
        setLoading(true);
        const response = await axios.get(
          `/api/weather/${encodeURIComponent(location)}`
        );
        setWeather(response.data);
        setError(null);
      } catch (err) {
        setError("Unable to fetch weather data");
        console.error("Weather fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [location]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Paper sx={{ p: 2, bgcolor: "#fff3f3" }}>
        <Typography color="error">{error}</Typography>
      </Paper>
    );
  }

  if (!weather) return null;

  return (
    <Paper sx={{ p: 2, display: "flex", alignItems: "center", gap: 2 }}>
      {weather.conditions === "sunny" ? <WbSunnyIcon /> : <CloudIcon />}
      <Box>
        <Typography variant="h6">{location}</Typography>
        <Typography>Temperature: {weather.data.temperature}°F</Typography>
        <Typography>Conditions: {weather.data.conditions}</Typography>
      </Box>
    </Paper>
  );
};

export default WeatherDisplay;
