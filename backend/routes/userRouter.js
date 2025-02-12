const express = require('express');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const User = require('../models/index.js'); 

const router = express.Router();

const CLIENT_ID = '';
const client = new OAuth2Client(CLIENT_ID);

router.post('/google/callback', async (req, res) => {
     const { token } = req.body;
   
     if (!token) {
       return res.status(400).json({ error: "Token is missing" });
     }
   
     console.log("Received token:", token);
   
     try {
       const ticket = await client.verifyIdToken({
         idToken: token,
         audience: CLIENT_ID,
       });
   
       const payload = ticket.getPayload();
       console.log("Verified Payload:", payload);
   
       const userId = payload['sub']; 
       const email = payload['email'];
       const name = payload['name'];
   
       console.log('User authenticated:', { userId, email, name });
   
       return res.status(200).json({userId, email, name});
     } catch (error) {
       console.error("Error verifying Google token:", error);
       return res.status(401).json({ error: "Authentication failed" });
     }
   });
   

module.exports = router;
