const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
// for .env file
require('dotenv').config();

const port = process.env.PORT || 5000;

const app = express();

//middleware
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_User}:${process.env.DB_Pass}@cluster0.mdrpi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  console.log("Genius Car DB connected");
  // perform actions on the collection object
  client.close();
});




// --------------------------------------
//
app.get('/', (req, res) => {
    res.send('Running Genius server');
});


// 5
app.listen(port, ()=>{
    console.log('Listening to port', port);
})
