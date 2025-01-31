const express = require('express');
const router = express.Router();
const { Note, Subject } = require('../models');

// Create a new note
router.post('/', async (req, res) => {
    try {
        const note = new Note(req.body);
        await note.save();
        res.status(201).send(note);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get all notes
router.get('/', async (req, res) => {
    try {
        const notes = await Note.find().populate('subject');
        res.status(200).send(notes);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Get a specific note by ID
router.get('/:id', async (req, res) => {
    try {
        const note = await Note.findById(req.params.id).populate('subject');
        if (!note) {
            return res.status(404).send({ message: 'Note not found' });
        }
        res.status(200).send(note);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update a note
router.put('/:id', async (req, res) => {
    try {
        const note = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!note) {
            return res.status(404).send({ message: 'Note not found' });
        }
        res.status(200).send(note);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete a note
router.delete('/:id', async (req, res) => {
    try {
        const note = await Note.findByIdAndDelete(req.params.id);
        if (!note) {
            return res.status(404).send({ message: 'Note not found' });
        }
        res.status(200).send({ message: 'Note deleted successfully' });
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;