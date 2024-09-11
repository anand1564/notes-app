

const express=require('express');
const router = express.Router();
const { createClient } = require('@supabase/supabase-js');
const supabase_url = process.env.SUPABASE_URL;  
const supabase_key = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabase_url, supabase_key);

router.post('/create',async(req,res)=>{
    const {name,password} = req.body;
    try{
        const{data,error} = await supabase.from('groups').insert([{name,password}]);
        if(error){
            res.status(400).json({
                message:"Error creating group",
            })
        }
        return res.json({
            data:data.id,
        });
    }
    catch(error){
        res.json({
            message:error.message
        })
    }
})
router.post('/join', async (req, res) => {
    const { group_id, password } = req.body;
    try {
        const { data, error } = await supabase
            .from('groups')
            .select('*')
            .eq('id', group_id)
            .eq('password', password)
            .single();

        if (error || !data) {
            return res.status(400).json({ message: "Invalid group ID or password" });
        }

        // Assuming success means redirecting to the dashboard
        return res.json({ message: "Successfully joined the group", group: data });
    } catch (error) {
        return res.json({ message: error.message });
    }
});

module.exports = router;