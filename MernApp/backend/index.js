const express = require('express');
const app = express();
const port = 5000;

app.use(express.json()); // <<< Needed to parse req.body

const mongoDB = require('./db');
mongoDB();

app.use((req,res,next)=>{
 res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');

  res.header(
    'Access-Control-Allow-Headers',
    'Origin , X-Requested-With, Content-Type,Accept'
  );
  next();
})


app.get('/', (req, res) => {
  res.send('Hello World! -----');
});



app.use('/api', require('./Routes/CreateUser'));
app.use('/api', require('./Routes/DisplayData'));
app.use('/api', require('./Routes/OrderData'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
