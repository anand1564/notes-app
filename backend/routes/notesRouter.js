const express = require('express');
const router = express.Router();
const { Note, Subject } = require('../models');
const multer = require('multer');
const path= require('path');
// Multer configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });
  
  const upload = multer({ storage });
  
  // Routes
  router.post("/upload", upload.single("file"), (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded." });
    }
    res.status(200).json({ filePath: `/uploads/${req.file.filename}` });
  });
module.exports = router;