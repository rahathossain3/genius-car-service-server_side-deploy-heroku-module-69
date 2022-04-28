## project basic/ starting code

### index.js
    // 1 & 2----------------
        const express = require('express');
    const cors = require('cors');
    // for .env file
    require('dotenv').config();

    const port = process.env.PORT || 5000;

    const app = express();

    // 3 -------------------
    //middleware
    app.use(cors());
    app.use(express.json());

    // 4 ----------------
    app.get('/', (req, res) => {
        res.send('Running Genius server');
    });


    // 5-------------
    app.listen(port, ()=>{
        console.log('Listening to port', port);
    })


### packege.json

* inside "script": 

    "start": "node index.js",
    "start-dev": "nodemon index.js",


### .env file

* code 
        DB_User=geniusUser
    DB_Pass=AQrvU8mYte9VjT5z

* useing index.js

    const uri = `mongodb+srv://${process.env.DB_User}:${process.env.DB_Pass}@cluster0.mdrpi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;


# data base file basic strucre


    const uri = `mongodb+srv://${process.env.DB_User}:${process.env.DB_Pass}@cluster0.mdrpi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

    async function run() {
        
        try{
    
        }
        finally{

        }

    }
    run().catch(console.dir);