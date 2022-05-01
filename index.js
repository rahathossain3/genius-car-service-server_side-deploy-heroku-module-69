const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
        //new collection 2
        const orderCollection = client.db('geniusCar').collection('order');

        //service collection api----------
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
            const query = { _id: ObjectId(id) };
            const service = await serviceCollection.findOne(query);
            res.send(service);
        })

        // Add a service from client side
        //post
        app.post('/service', async (req, res) => {
            const newService = req.body;
            const result = await serviceCollection.insertOne(newService);
            res.send(result);

        })


        //delete service

        app.delete('/service/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await serviceCollection.deleteOne(query);
            res.send(result);

        })

        // order collection API ---------------------------
        // post api
        app.post('/order', async (req, res) => {

            const order = req.body;
            const result = await orderCollection.insertOne(order);

            res.send(result)
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
