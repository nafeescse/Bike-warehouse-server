const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// heroku setup

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.4l5l2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
console.log('db connected');
async function run() {

    try {
        await client.connect();
        const itemCollection = client.db("wirehouse").collection("products");

        app.get('/products', async (req, res) => {
            const query = {};
            const cursor = itemCollection.find(query);
            const items = await cursor.toArray();
            res.send(items);
        });

        app.get('/products/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await itemCollection.findOne(query);
            res.send(result);
        });

        app.get('/hero',(req, res) => {
            
            res.send('testing successful');
        });
        // POST neew items
        app.post('/products', async (req, res) => {
            const newItem = req.body;
            console.log('adding new item', newItem);
            const result = await itemCollection.insertOne(newItem);
            res.send(result)
        });

        // update items
        app.put('/products/:id', async (req, res) => {
            const id = req.params.id;
            const updatedItem = req.body;
            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };
            const updatedDoc = {
                $set: {
                    quantity: updatedDoc.quantity
                }
                // "$inc": {
                //     name: 10
                // }
            };
            const result = await itemCollection.updateOne(filter, updatedDoc, options);
            res.send(result);

        })

        // delete an item
        app.delete('/products/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await itemCollection.deleteOne(query);
            res.send(result);
        })

    }
    finally {

    }
}
run().catch(console.dir);




app.get('/', (req, res) => {
    res.send('Running server side...')
})

app.listen(port, () => {
    console.log('listening');
})
