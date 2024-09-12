require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();
app.use(cors({ origin: '*' }));

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

app.use(cors());
app.use(express.json());

const subjectRouter = require('./api/subjectRouter');
const groupRouter = require('./api/groupRouter');
const notesRouter = require('./api/notesRouter');
const userRouter = require('./api/userRouter');

app.use('/api/notes', notesRouter);
app.use('/api/group', groupRouter);
app.use('/api/subject', subjectRouter);
app.use('/api/user', userRouter);

app.get('/hello', (req, res) => {
    res.json({ message: "Hello World" });
});

// Global error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
