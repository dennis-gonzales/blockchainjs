const express = require('express');
const path = require('path');
const logger = require('./middleware/logger');
const bc = require('./core/bc');
const P2pServer = require('./p2pserver');

const app = express();
const p2pserver = new P2pServer(bc);

app.use(express.json()); // body parser for post requests
app.use(express.static(path.join(__dirname, '../public')));

// middlewares
app.use(logger);
app.use('/blocks', require('./routes/api/blocks'));

const HTTP_PORT = process.env.HTTP_PORT || 3001;
app.listen(HTTP_PORT, () => console.log(`Listening on port ${HTTP_PORT}`));
p2pserver.listen();

//HTTP_PORT=3002 P2P_PORT=5002 PEERS=ws://localhost:5001 npm run dev