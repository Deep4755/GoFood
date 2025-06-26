const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://GoFood_Deep:Deep2121@cluster0.ya0xzdz.mongodb.net/GoFoodMern';
const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✔ MongoDB connected');

    const db = mongoose.connection.db;

    const foodItemsCollection = db.collection('foodItems');
    const foodCategoryCollection = db.collection('foodCategory');

    const data = await foodItemsCollection.find({}).toArray();
    const catData = await foodCategoryCollection.find({}).toArray();

    global.foodItems = data;
    global.foodCategory = catData;

    console.log('✔ Fetched foodItems and foodCategory');

  } catch (err) {
    console.error('MongoDB error:', err.message);
  }
};

module.exports = mongoDB;