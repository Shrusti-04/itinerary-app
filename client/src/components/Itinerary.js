import React, { useState } from "react";
import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  TextField,
  Button,
  Box,
  IconButton,
  Grid,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

const Itinerary = ({ tripId, date, readOnly }) => {
  const [activities, setActivities] = useState([]);
  const [newActivity, setNewActivity] = useState({
    time: "",
    description: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItinerary = async () => {
      try {
        const response = await axios.get(`/api/trips/${tripId}`);
        setActivities(
          response.data.itinerary.filter(
            (activity) =>
              new Date(activity.date).toDateString() ===
              new Date(date).toDateString()
          )
        );
      } catch (error) {
        console.error("Error fetching itinerary:", error);
      } finally {
        setLoading(false);
      }
    };

    if (tripId && date) {
      fetchItinerary();
    }
  }, [tripId, date]);

  const handleAddActivity = async () => {
    if (newActivity.time && newActivity.description) {
      try {
        const response = await axios.post(`/api/trips/${tripId}/itinerary`, {
          ...newActivity,
          date,
        });
        setActivities([...activities, response.data]);
        setNewActivity({ time: "", description: "" });
      } catch (error) {
        console.error("Error adding activity:", error);
      }
    }
  };

  const handleDeleteActivity = async (activityId) => {
    try {
      await axios.delete(`/api/trips/${tripId}/itinerary/${activityId}`);
      setActivities(
        activities.filter((activity) => activity._id !== activityId)
      );
    } catch (error) {
      console.error("Error deleting activity:", error);
    }
  };

  return (
    <Paper sx={{ p: 2, mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Daily Itinerary - {new Date(date).toLocaleDateString()}
      </Typography>

      <Box sx={{ mb: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              type="time"
              label="Time"
              value={newActivity.time}
              onChange={(e) =>
                setNewActivity({
                  ...newActivity,
                  time: e.target.value,
                })
              }
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={7}>
            <TextField
              fullWidth
              label="Activity Description"
              value={newActivity.description}
              onChange={(e) =>
                setNewActivity({
                  ...newActivity,
                  description: e.target.value,
                })
              }
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <Button
              fullWidth
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleAddActivity}
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </Box>

      <List>
        {activities
          .sort((a, b) => a.time.localeCompare(b.time))
          .map((activity) => (
            <ListItem
              key={activity.id}
              secondaryAction={
                <IconButton
                  edge="end"
                  onClick={() => handleDeleteActivity(activity.id)}
                >
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemText
                primary={activity.description}
                secondary={activity.time}
              />
            </ListItem>
          ))}
      </List>
    </Paper>
  );
};

export default Itinerary;
