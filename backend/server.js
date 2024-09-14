require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
const path = require('path');
const fileHandler = require('./fileuploadhandler');


const app = express();
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    throw new Error('Supabase URL or Key is not defined');
}

const supabase = createClient(supabaseUrl, supabaseKey);
if(!supabase){
    console.log("Error connecting to supabase");
}else{
    console.log("Connected to supabase");
}

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Middleware to handle CORS and JSON parsing
app.use(cors({ origin: '*' }));
app.use(express.json());

// Use file handler for uploading files
app.use('/api', fileHandler); // Ensure upload route is '/api/upload'

app.get('/hello', (req, res) => {
  res.json({ message: "Hello World" });
});

const subjectRouter = require('./api/subjectRouter');
const groupRouter = require('./api/groupRouter');
const notesRouter = require('./api/notesRouter');
const userRouter = require('./api/userRouter');

app.use('/api/notes', notesRouter);
app.use('/api/group', groupRouter);
app.use('/api/subject', subjectRouter);
app.use('/api/user', userRouter);


// Global error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
  });
  

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
