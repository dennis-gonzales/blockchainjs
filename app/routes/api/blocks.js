const express = require('express');
const bc = require('../../core/bc');
const router = express.Router();

router.get('/', (req, res) => res.json(bc.chain));

router.get('/:nonce', (req, res) => res.json(bc.chain[req.params.nonce]));

/// It is required to have this headers given below
/// Content-Type: application/json
/// To be able to parse the response as a json
router.post('/mine', (req, res) => {
    const block = bc.addBlock(req.body.data);
    console.log(`New block added: ${block.toString()}`);

    res.redirect('/blocks');
});

module.exports = router;