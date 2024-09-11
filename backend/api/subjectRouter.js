const express = require('express');
const router = express.Router();
const { createClient } = require('@supabase/supabase-js');
const supabase_url = process.env.SUPABASE_URL;  
const supabase_key = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabase_url, supabase_key);
// Route to create a subject related to a specific group
router.post('/:group_id/create', async (req, res) => {
    const { group_id } = req.params;
    const { name } = req.body;
console.log("Recieved a request",group_id);
    try {
        const { data, error } = await supabase
            .from('subjects')
            .insert([{ name, group_id }]);

        if (error) {
            return res.status(400).json({ message: "Error creating subject" });
        }

        return res.json(data);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
router.get('/:group_id/get', async (req, res) => {
    const { group_id } = req.params; 

    try {
        const { data, error } = await supabase
            .from('subjects')
            .select('*')
            .eq('group_id', group_id);

        if (error) {
            return res.status(400).json({ message: "Error fetching subjects" });
        }

        return res.json(data);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

module.exports = router;