const express = require('express');
const router = express.Router();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Route to sign up a new user
router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Sign up with Supabase Auth
        const { user, error: authError } = await supabase.auth.signUp({
            email,
            password,
        });

        if (authError) {
            return res.status(400).json({ message: authError.message });
        }

        // Store additional user info in the profiles table
        const { data, error: dbError } = await supabase
            .from('profiles')
            .insert([{ id: user.id, username, email, password }]);

        if (dbError) {
            return res.status(400).json({ message: dbError.message });
        }

        return res.status(201).json(data);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

// Route to log in a user
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            return res.status(400).json({ message: error.message });
        }

        return res.json(data);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

module.exports= router;