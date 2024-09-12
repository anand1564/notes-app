const express = require('express');
const router = express.Router();
const { createClient } = require('@supabase/supabase-js');
const supabase_url = process.env.SUPABASE_URL;
const supabase_key = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabase_url, supabase_key);

router.post('/:group_id/create', async (req, res) => {
    const { group_id } = req.params;
    const { name } = req.body;

    if (!name || !group_id) {
        return res.status(400).json({ message: "Invalid input" });
    }

    try {
        const { data, error } = await supabase
            .from('subjects')
            .insert([{ name, group_id }]);

        if (error) {
            console.error("Error creating subject:", error.message);
            return res.status(400).json({ message: error.message });
        }else{
            console.log("Subject created successfully");
        }

        return res.json(data);
    } catch (error) {
        console.error("Error:", error.message);
        return res.status(500).json({ message: error.message });
    }
});

router.get('/:group_id/get', async (req, res) => {
    const { group_id } = req.params;

    if (!group_id) {
        return res.status(400).json({ message: "Invalid group_id" });
    }

    try {
        const { data, error } = await supabase
            .from('subjects')
            .select('*')
            .eq('group_id', group_id);

        if (error) {
            console.error("Error fetching subjects:", error.message);
            return res.status(400).json({ message: error.message });
        }

        return res.json(data);
    } catch (error) {
        console.error("Error:", error.message);
        return res.status(500).json({ message: error.message });
    }
});


module.exports = router;
