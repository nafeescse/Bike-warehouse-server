const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());



const uri = "mongodb+srv://dbserver1:EkSsh05KlZzFG547@cluster0.4l5l2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
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

        // POST items
        app.post('/products', async(req, res) =>{
            const newItem = req.body;
            console.log('adding new item', newItem);
            const result = await itemCollection.insertOne(newItem);
            res.send(result)
        });

        // update user
        

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