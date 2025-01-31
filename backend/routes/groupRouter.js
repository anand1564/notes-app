const express = require('express');
const router = express.Router();
const { Group, User } = require('../models');

// Create a new group
router.post('/', async (req, res) => {
    try {
        const group = new Group(req.body);
        await group.save();
        res.status(201).send(group);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get all groups
router.get('/', async (req, res) => {
    try {
        const groups = await Group.find().populate('users subjects');
        res.status(200).send(groups);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Get a specific group by ID
router.get('/:id', async (req, res) => {
    try {
        const group = await Group.findById(req.params.id).populate('users subjects');
        if (!group) {
            return res.status(404).send({ message: 'Group not found' });
        }
        res.status(200).send(group);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update a group
router.put('/:id', async (req, res) => {
    try {
        const group = await Group.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!group) {
            return res.status(404).send({ message: 'Group not found' });
        }
        res.status(200).send(group);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete a group
router.delete('/:id', async (req, res) => {
    try {
        const group = await Group.findByIdAndDelete(req.params.id);
        if (!group) {
            return res.status(404).send({ message: 'Group not found' });
        }
        res.status(200).send({ message: 'Group deleted successfully' });
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;