import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container, AppBar, Toolbar, Typography, Box } from "@mui/material";
import TripList from "./components/TripList";
import TripForm from "./components/TripForm";
import ReminderNotification from "./components/ReminderNotification";
import WeatherDisplay from "./components/WeatherDisplay";

function App() {
  return (
    <Router>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="h6"
              component={Link}
              to="/"
              sx={{
                flexGrow: 1,
                textDecoration: "none",
                color: "inherit",
              }}
            >
              TripMate
            </Typography>
          </Toolbar>
        </AppBar>
        <ReminderNotification />
        <Container sx={{ mt: 3 }}>
          <Routes>
            <Route path="/" element={<TripList />} />
            <Route path="/trips" element={<TripList />} />
            <Route path="/trips/new" element={<TripForm />} />
            <Route path="/trips/edit/:id" element={<TripForm />} />
            <Route path="/shared/:token" element={<SharedTripView />} />
          </Routes>
        </Container>
      </Box>
    </Router>
  );
}

export default App;
