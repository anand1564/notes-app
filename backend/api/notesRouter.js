
const express =require('express');
const router = express.Router();

const { createClient } = require('@supabase/supabase-js');
const supabase_url = process.env.SUPABASE_URL;
const supabase_key = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabase_url, supabase_key);

router.post('/:group_id/:subject_id/create',async(req,res)=>{
    const {group_id,subject_id} = req.params;
    const {title,description,pdf_url} = req.body;
    try {
        const {data,error} = await supabase.from('notes').insert([{subject_id,title,description,pdf_url}]);
        if(error) throw error;
        res.status(201).json(data[0]);
    } catch (error) {
        console.error(`Error creating note: ${error}`)
    }
})
router.get('/:group_id/:subject_id/get', async (req, res) => {
    const { group_id, subject_id } = req.params;
    try {
        console.log(`Fetching notes for subject: ${subject_id}`);
        const startTime = Date.now();
        const { data, error } = await supabase
            .from('notes')
            .select('*')
            .eq('subject_id', subject_id);
        const endTime = Date.now();
        
        if (error) {
            console.error(`Supabase error: ${error.message}`);
            return res.status(500).json({ error: 'Error fetching notes from database' });
        }
        
        console.log(`Fetched ${data.length} notes in ${endTime - startTime}ms`);
        res.json(data);
    } catch (error) {
        console.error(`Error fetching notes: ${error}`);
        res.status(500).json({ error: 'Server error while fetching notes' });
    }
});

module.exports = router;