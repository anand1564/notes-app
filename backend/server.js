const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRouter');
const groupRoutes = require('./routes/groupRouter');
const subjectRoutes = require('./routes/subjectRouter');
const noteRoutes = require('./routes/notesRouter');

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect('', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Routes
app.use('/users', userRoutes);
app.use('/groups', groupRoutes);
app.use('/subjects', subjectRoutes);
app.use('/notes', noteRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});