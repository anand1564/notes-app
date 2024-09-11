require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Key:', supabaseKey);

if (!supabaseKey) {
    throw new Error('Supabase Key is not defined');
}

const supabase = createClient(supabaseUrl, supabaseKey);

app.use(cors());
app.use(express.json());

const subjectRouter = require('./api/subjectRouter');
const groupRouter = require('./api/groupRouter');
app.use('/api/group',groupRouter);
app.use('/api/subject', subjectRouter);

app.get('/hello', (req, res) => {
    res.json({
        message: "Hello World"
    });
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
