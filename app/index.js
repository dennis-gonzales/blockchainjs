const express = require('express');
const Blockchain = require('../blockchain');

const HTTP_PORT = process.env.HTTP_PORT || 3001;

const app = express();
app.use(express.json());

const bc = new Blockchain();
bc.addBlock('Hello World!');

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/block/:nonce', (req, res) => {
    const nonce = req.params.nonce;
    res.json(bc.chain[nonce]);
});

app.get('/block', (req, res) => {
    const nonce = req.query.nonce;
    res.json(bc.chain[nonce]);
});

app.get('/blocks', (req, res) => {
    res.json(bc.chain);
});

app.post('/mine', (req, res) => {
    const block = bc.addBlock(req.body);
    console.log(`New block added: ${block.toString()}`);

    res.redirect('/blocks');
});

app.listen(HTTP_PORT, () => console.log(`Listening on port ${HTTP_PORT}`));