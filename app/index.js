const express = require('express');
const path = require('path');
const Blockchain = require('../blockchain');

const HTTP_PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json());

app.use(express.static(path.join(__dirname, '../public')));

const bc = new Blockchain();
bc.addBlock('Hello World!');

app.get('/block/:nonce', (req, res) => res.json(bc.chain[req.query.nonce]));

app.get('/block', (req, res) => res.json(bc.chain[req.query.nonce]));

app.get('/blocks', (req, res) => res.json(bc.chain));

app.post('/mine', (req, res) => {
    const block = bc.addBlock(req.body);
    console.log(`New block added: ${block.toString()}`);

    res.redirect('/blocks');
});

app.listen(HTTP_PORT, () => console.log(`Listening on port ${HTTP_PORT}`));