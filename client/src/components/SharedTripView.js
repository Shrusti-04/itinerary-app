import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Paper,
  Typography,
  CircularProgress,
  Box,
} from "@mui/material";
import WeatherDisplay from "./WeatherDisplay";
import PackingList from "./PackingList";
import Itinerary from "./Itinerary";
import axios from "axios";

const SharedTripView = () => {
  const { token } = useParams();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSharedTrip = async () => {
      try {
        const response = await axios.get(`/api/share/shared/${token}`);
        setTrip(response.data);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.message || "Error loading shared trip");
      } finally {
        setLoading(false);
      }
    };

    fetchSharedTrip();
  }, [token]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Paper sx={{ p: 3, bgcolor: "#fff3f3" }}>
          <Typography color="error">{error}</Typography>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          {trip.name}
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          {new Date(trip.startDate).toLocaleDateString()} -{" "}
          {new Date(trip.endDate).toLocaleDateString()}
        </Typography>
        <Typography>{trip.description}</Typography>
      </Paper>

      {trip.location && (
        <Box mb={3}>
          <WeatherDisplay location={trip.location} />
        </Box>
      )}

      <Itinerary tripId={trip.id} date={trip.startDate} readOnly />
      <PackingList tripId={trip.id} readOnly />
    </Container>
  );
};

export default SharedTripView;
