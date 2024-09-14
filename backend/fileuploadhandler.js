const express = require('express');
const multer = require('multer');
const path = require('path');

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
});

const upload = multer({ storage: storage });

router.post('/notes/:group_id/:subject_id/create', upload.single('pdf'), async (req, res) => {
    try {
      const { title, description } = req.body;
      const file = req.file;
  
      // Validate input
      if (!title || !description || !file) {
        return res.status(400).json({ message: 'Missing required fields' });
      }
  
      // Simulate note creation
      const newNote = {
        id: Date.now(),  // Simulating note ID
        title,
        description,
        pdf_url: file.filename
      };
  
      // Return the created note
      res.status(201).json(newNote);
    } catch (err) {
      console.error('Error creating note:', err.message || err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  

module.exports = router;