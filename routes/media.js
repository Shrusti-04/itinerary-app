const express = require("express");
const router = express.Router();
const multer = require("multer");
const localStorage = require("../utils/localStorage");

// Configure multer for memory storage
const upload = multer({ storage: multer.memoryStorage() });

// Upload file
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const result = await localStorage.uploadFile(
      req.file.buffer,
      req.file.originalname
    );
    res.json(result);
  } catch (error) {
    console.error("File upload error:", error);
    res
      .status(500)
      .json({ message: "Error uploading file", error: error.message });
  }
});

// Delete file
router.delete("/:fileName", async (req, res) => {
  try {
    await localStorage.deleteFile(req.params.fileName);
    res.json({ message: "File deleted successfully" });
  } catch (error) {
    console.error("File deletion error:", error);
    res
      .status(500)
      .json({ message: "Error deleting file", error: error.message });
  }
});

module.exports = router;
