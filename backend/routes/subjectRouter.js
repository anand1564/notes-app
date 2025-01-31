const express = require('express');
const router = express.Router();
const { Subject, Group, Note } = require('../models');

// Create a new subject
router.post('/', async (req, res) => {
    try {
        const subject = new Subject(req.body);
        await subject.save();
        res.status(201).send(subject);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get all subjects
router.get('/', async (req, res) => {
    try {
        const subjects = await Subject.find().populate('group notes');
        res.status(200).send(subjects);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Get a specific subject by ID
router.get('/:id', async (req, res) => {
    try {
        const subject = await Subject.findById(req.params.id).populate('group notes');
        if (!subject) {
            return res.status(404).send({ message: 'Subject not found' });
        }
        res.status(200).send(subject);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update a subject
router.put('/:id', async (req, res) => {
    try {
        const subject = await Subject.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!subject) {
            return res.status(404).send({ message: 'Subject not found' });
        }
        res.status(200).send(subject);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete a subject
router.delete('/:id', async (req, res) => {
    try {
        const subject = await Subject.findByIdAndDelete(req.params.id);
        if (!subject) {
            return res.status(404).send({ message: 'Subject not found' });
        }
        res.status(200).send({ message: 'Subject deleted successfully' });
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;