const express = require('express');
const router = express.Router();
const Blockchain = require('../../../blockchain');

const bc = new Blockchain();
bc.addBlock('Hello World!');

router.get('/', (req, res) => res.json(bc.chain));

router.get('/:nonce', (req, res) => res.json(bc.chain[req.params.nonce]));

router.post('/mine', (req, res) => {
    const block = bc.addBlock(req.body);
    console.log(`New block added: ${block.toString()}`);

    res.redirect('/blocks');
});

module.exports = router;