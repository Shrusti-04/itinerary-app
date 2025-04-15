import React, { useState } from "react";
import {
  Paper,
  TextField,
  Button,
  Grid,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const TripForm = () => {
  const navigate = useNavigate();
  const [tripData, setTripData] = useState({
    name: "",
    startDate: "",
    endDate: "",
    description: "",
    location: "",
    coverImage: null,
    images: [],
  });
  const [uploadError, setUploadError] = useState("");
  const handleImageUpload = async (file, isCover = false) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post("/api/media/upload", formData);

      if (isCover) {
        setTripData((prev) => ({
          ...prev,
          coverImage: response.data,
        }));
      } else {
        setTripData((prev) => ({
          ...prev,
          images: [...prev.images, response.data],
        }));
      }
      setUploadError("");
    } catch (error) {
      console.error("Error uploading image:", error);
      setUploadError("Failed to upload image. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (tripId) {
        await axios.put(`/api/trips/${tripId}`, tripData);
      } else {
        await axios.post("/api/trips", tripData);
      }
      navigate("/trips");
    } catch (error) {
      console.error("Error saving trip:", error);
      setUploadError("Failed to save trip. Please try again.");
    }
  };

  return (
    <Paper sx={{ p: 3, maxWidth: 600, mx: "auto" }}>
      <Typography variant="h5" gutterBottom>
        Create New Trip
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Trip Name"
              value={tripData.name}
              onChange={(e) =>
                setTripData({ ...tripData, name: e.target.value })
              }
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="date"
              label="Start Date"
              InputLabelProps={{ shrink: true }}
              value={tripData.startDate}
              onChange={(e) =>
                setTripData({ ...tripData, startDate: e.target.value })
              }
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="date"
              label="End Date"
              InputLabelProps={{ shrink: true }}
              value={tripData.endDate}
              onChange={(e) =>
                setTripData({ ...tripData, endDate: e.target.value })
              }
              required
            />
          </Grid>{" "}
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Description"
              value={tripData.description}
              onChange={(e) =>
                setTripData({ ...tripData, description: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Location"
              value={tripData.location}
              onChange={(e) =>
                setTripData({ ...tripData, location: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>
              Cover Image
            </Typography>
            <input
              accept="image/*"
              type="file"
              id="cover-image"
              hidden
              onChange={(e) => handleImageUpload(e.target.files[0], true)}
            />
            <label htmlFor="cover-image">
              <Button
                variant="outlined"
                component="span"
                startIcon={<AddPhotoAlternateIcon />}
              >
                Upload Cover Image
              </Button>
            </label>
            {tripData.coverImage && (
              <Box mt={2}>
                <img
                  src={tripData.coverImage.url}
                  alt="Cover"
                  style={{ maxWidth: "100%", maxHeight: "200px" }}
                />
              </Box>
            )}
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>
              Additional Images
            </Typography>
            <input
              accept="image/*"
              type="file"
              id="trip-images"
              hidden
              onChange={(e) => handleImageUpload(e.target.files[0], false)}
            />
            <label htmlFor="trip-images">
              <Button
                variant="outlined"
                component="span"
                startIcon={<AddPhotoAlternateIcon />}
              >
                Add Images
              </Button>
            </label>
            <Grid container spacing={1} mt={1}>
              {tripData.images.map((image, index) => (
                <Grid item xs={4} key={index}>
                  <img
                    src={image.url}
                    alt={`Trip ${index + 1}`}
                    style={{ width: "100%", aspectRatio: "1" }}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
          {uploadError && (
            <Grid item xs={12}>
              <Typography color="error">{uploadError}</Typography>
            </Grid>
          )}
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Save Trip
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default TripForm;
