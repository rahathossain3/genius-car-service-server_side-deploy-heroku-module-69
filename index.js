const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectID } = require('mongodb');
// for .env file
require('dotenv').config();

const port = process.env.PORT || 5000;

const app = express();

//middleware
app.use(cors());
app.use(express.json());


//database file
const uri = `mongodb+srv://${process.env.DB_User}:${process.env.DB_Pass}@cluster0.mdrpi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {

    try {
        await client.connect();
        const serviceCollection = client.db('geniusCar').collection('service');

        // get all services
        app.get('/service', async (req, res) => {

            const query = {};
            const cursor = serviceCollection.find(query);
            const services = await cursor.toArray();

            res.send(services);
        });


        // get single service 
        app.get('/service/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectID(id) };
            const service = await serviceCollection.findOne(query);
            res.send(service);
        })


    }
    finally {

    }

}
run().catch(console.dir);




// --------------------------------------
//
app.get('/', (req, res) => {
    res.send('Running Genius server');
});


// 5
app.listen(port, () => {
    console.log('Listening to port', port);
})
