const express = require('express')
const router = express.Router();
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const jwtSecret = 'MynameissandeepkaurOnInstagram'

router.post("/createuser", 
      [
     body('name', 'Enter a valid name').isLength({ min: 10 }),

    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be at least 5 characters').isLength({ min: 5 }),
  ],
    async(req , res)=>{

         const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
const salt = await bcrypt.genSalt(10);
let setPassword = await bcrypt.hash( req.body.password,salt);
    try{
        const user = await User.create({
  name: req.body.name,
  password: setPassword,
  email: req.body.email,
  location: req.body.location
});
res.status(201).json({ success: true, user });


    }
catch(error){
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
}


});
router.post("/loginuser", [
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password must be at least 5 characters').isLength({ min: 5 }),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // 🔍 Find user by email
   let userData = await User.findOne({ email: req.body.email });

    if (!userData) {
      return res.status(400).json({ errors: 'User not found. Try registering.' });
    }

    // 🔐 Compare plain text passwords
    const pwdCompare = await bcrypt.compare(req.body.password,userData.password)
    if (!pwdCompare) {
      return res.status(400).json({ errors: 'Incorrect password' });
    }
    const data ={
      user:{
        id:userData.id
      }
    

    }
      const authToken =jwt.sign(data,jwtSecret)
    // ✅ Login successful
    return res.status(200).json({ success: true, authToken:authToken});

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});


module.exports= router;