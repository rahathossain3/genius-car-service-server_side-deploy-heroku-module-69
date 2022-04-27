const express = require('express');
const cors = require('cors');
// for .env file
require('dotenv').config();
const app = express();

//middleware
app.use(cors());
app.use(express.json());

//
app.get('/', (req, res) => {
    res.send('Running Genius server')
})
