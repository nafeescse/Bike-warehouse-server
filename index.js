const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.4l5l2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
console.log('db connected');
async function run(){

    try{
        await client.connect();
        const itemCollection = client.db("wirehouse").collection("products");

        app.get('/products', async(req, res) =>{
            const query = {};
            const cursor = itemCollection.find(query);
            const items = await cursor.toArray();
            res.send(items);
        });

        app.get('/products/:id', async(req, res) =>{
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const result = await itemCollection.findOne(query);
            res.send(result);
        });

        // POST User : add a new user
        app.post('/products', async(req, res) =>{
            const newItem = req.body;
            console.log('adding new item', newItem);
            const result = await itemCollection.insertOne(newItem);
            res.send(result)
        });

        // update user
        app.put('/products/:id', async(req, res) =>{
            const id = req.params.id;
            const updatedItem = req.body;
            const filter = {_id: ObjectId(id)};
            const options = { upsert: true };
            const updatedDoc = {
                $set: {
                    name: updatedItem.name,
                    model: updatedItem.model
                }
                // "$inc": {
                //     name: 10
                // }
            };
            const result = await itemCollection.updateOne(filter, updatedDoc, options);
            res.send(result);

        })

        // delete a user
        app.delete('/products/:id', async(req, res) =>{
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const result = await itemCollection.deleteOne(query);
            res.send(result);
        })

        // app.post('/productss', (req, res) =>  {
        //     const newItems = req.body;
        //     console.log('Adding', newItems);
        //     res.send({result: 'Items Added successfully!!'})
        // });
        // const products =  {name: "suzuki" , model: "sf"};
        // const result = await userCollection.insertOne(products);
        // console.log(`inserted: ${result.insertedId}`);

    }
    finally{

    }
}
run().catch(console.dir);




app.get('/', (req, res) => {
    res.send('Running...')
})

app.listen(port, () => {
    console.log('listening');
})

// user:dbserver1
// pass:EkSsh05KlZzFG547