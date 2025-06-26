const express = require('express')
const router = express.Router();


// In backend/Routes/DisplayData.js
router.get('/foodData', (req, res) => {
  try {
    console.log(global.foodItems, global.foodCategory);
    res.json({
      foodItems: global.foodItems,
      foodCategory: global.foodCategory
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});









module.exports= router;