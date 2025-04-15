import React, { useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  IconButton,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ShareTrip from "./ShareTrip";
import { getTrips, saveTrips } from "../utils/storage";

const TripList = () => {
  const [trips, setTrips] = useState([]);
  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await axios.get("/api/trips");
        setTrips(response.data);
      } catch (error) {
        console.error("Error fetching trips:", error);
        // TODO: Add error notification
      }
    };

    fetchTrips();
  }, []);

  const handleDelete = async (tripId) => {
    try {
      await axios.delete(`/api/trips/${tripId}`);
      setTrips(trips.filter((trip) => trip._id !== tripId));
    } catch (error) {
      console.error("Error deleting trip:", error);
      // TODO: Add error notification
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography variant="h4">My Trips</Typography>
          <Button
            component={Link}
            to="/trips/new"
            variant="contained"
            color="primary"
          >
            Create New Trip
          </Button>
        </Box>
      </Grid>
      {trips.map((trip) => (
        <Grid item xs={12} sm={6} md={4} key={trip.id}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                {trip.name}
              </Typography>
              <Typography color="textSecondary" gutterBottom>
                {new Date(trip.startDate).toLocaleDateString()} -{" "}
                {new Date(trip.endDate).toLocaleDateString()}
              </Typography>
              {trip.location && (
                <Typography color="textSecondary">
                  📍 {trip.location}
                </Typography>
              )}
            </CardContent>
            <CardActions>
              <IconButton
                component={Link}
                to={`/trips/edit/${trip.id}`}
                size="small"
              >
                <EditIcon />
              </IconButton>
              <ShareTrip tripId={trip.id} />
              <IconButton
                size="small"
                color="error"
                onClick={() => handleDelete(trip.id)}
              >
                <DeleteIcon />
              </IconButton>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default TripList;
