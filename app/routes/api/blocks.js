const express = require('express');
const p2p = require('../../core/p2p');
const bc = require('../../core/bc');
const router = express.Router();

router.get('/', (req, res) => res.json(bc.chain));

router.get('/:nonce', (req, res) => res.json(bc.chain[req.params.nonce]));

/// It is required to have this headers given below
/// Content-Type: application/json
/// To be able to parse the response as a json
router.post('/mine', (req, res) => {
    if (req.body.data) {
        const block = bc.addBlock(req.body.data);
        console.log(`New block added: ${block.toString()}`);

        p2p.syncChain();
        res.redirect('/blocks');
    } else {
        res.json({ error: 'Invalid request...' })
    }
});

module.exports = router;