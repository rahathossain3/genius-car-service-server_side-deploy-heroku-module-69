const express = require('express');
const cors = require('cors');
// for jwt 
const jwt = require('jsonwebtoken');

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const { query } = require('express');
// for .env file
require('dotenv').config();

const port = process.env.PORT || 5000;

const app = express();

//middleware
app.use(cors());
app.use(express.json());


// for verify token
function verifyJWT(req, res, next) {

    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).send({ message: 'unauthorized access' })
    }
    const token = authHeader.split(' ')[1];

    // verify JWT
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).send({ message: 'Forbidden access' });
        }
        console.log('decoded', decoded);
        req.decoded = decoded;
    })

    next();
}



//database file
const uri = `mongodb+srv://${process.env.DB_User}:${process.env.DB_Pass}@cluster0.mdrpi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {

    try {
        await client.connect();
        const serviceCollection = client.db('geniusCar').collection('service');
        //new collection 2
        const orderCollection = client.db('geniusCar').collection('order');

        // AUTH - JWT ------------
        app.post('/login', async (req, res) => {
            const user = req.body;
            const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '1d'
            });

            res.send({ accessToken });


        })



        // SERVICES API----********************

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

        //get 
        app.get('/order', verifyJWT, async (req, res) => {

            // decoded
            const decodedEmail = req.decoded.email
            // get user wise data
            const email = req.query.email;

            if (email == decodedEmail) {
                const query = { email: email };
                const cursor = orderCollection.find(query);
                const orders = await cursor.toArray();
                res.send(orders);
            }
            else {
                res.status(403).send({ message: 'forbidden access' });
            }

        })

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
