import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Snackbar,
  IconButton,
} from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import axios from "axios";

const ShareTrip = ({ tripId }) => {
  const [open, setOpen] = useState(false);
  const [shareUrl, setShareUrl] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleShare = async () => {
    try {
      const response = await axios.post(`/api/share/trips/${tripId}`);
      const baseUrl = window.location.origin;
      setShareUrl(`${baseUrl}${response.data.shareUrl}`);
    } catch (error) {
      console.error("Error generating share link:", error);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setSnackbarOpen(true);
  };

  return (
    <>
      <IconButton
        onClick={() => {
          setOpen(true);
          handleShare();
        }}
      >
        <ShareIcon />
      </IconButton>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Share Trip</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            value={shareUrl}
            InputProps={{
              readOnly: true,
              endAdornment: (
                <IconButton onClick={handleCopy}>
                  <ContentCopyIcon />
                </IconButton>
              ),
            }}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={() => setSnackbarOpen(false)}
        message="Share link copied to clipboard"
      />
    </>
  );
};

export default ShareTrip;
