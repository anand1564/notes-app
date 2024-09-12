
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
        const response = await supabase.from('notes').insert([{subject_id,title,description,pdf_url}]);
        if(response.ok){
            return res.json(response.data);
        }else{
            console.log("Error creating note");
        }
    } catch (error) {
        console.error(`Error creating note: ${error}`)
    }
})
router.get('/:group_id/:subject_id/get',async(req,res)=>{
    const {group_id,subject_id} = req.params;
    try {
        const response = await supabase.from('notes').select('*').eq('subject_id',subject_id);
        if(response.ok){
            return res.json(response.data);
        }else{
            console.log("Error fetching notes");
        }
    } catch (error) {
        console.error(`Error fetching notes: ${error}`)
    }
})

module.exports = router;