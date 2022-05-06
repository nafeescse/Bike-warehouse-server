const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
    res.send('hello')
});

app.get('/products', (req, res) => {
    res.send([{"id": 1, "name": "nafees"}, {"id": 2, "name": "nakees"}, {"id": 3, "name": "nabees"}])
})

app.listen(port, () => {
    console.log('listening');
})