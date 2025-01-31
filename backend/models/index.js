const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    groups: [{
        type: Schema.Types.ObjectId,
        ref: 'Group',
    }]
});

const groupSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    users: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }],
    subjects: [{
        type: Schema.Types.ObjectId,
        ref: 'Subject',
    }]
});

const subjectSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    group: {
        type: Schema.Types.ObjectId,
        ref: 'Group',
    },
    notes: [{
        type: Schema.Types.ObjectId,
        ref: 'Note',
    }]
});

const noteSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    pdf: {
        type: String
    },
    subject: {
        type: Schema.Types.ObjectId,
        ref: 'Subject',
    }
});

module.exports = {
    User: mongoose.model('User', userSchema),
    Group: mongoose.model('Group', groupSchema),
    Subject: mongoose.model('Subject', subjectSchema),
    Note: mongoose.model('Note', noteSchema),
};