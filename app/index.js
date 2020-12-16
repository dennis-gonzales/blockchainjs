const express = require('express');
const path = require('path');
const logger = require('./middleware/logger');

const app = express();

app.use(express.json()); // body parser for post requests
app.use(express.static(path.join(__dirname, '../public')));

// middlewares
app.use(logger);
app.use('/blocks', require('./routes/api/blocks'));

const HTTP_PORT = process.env.HTTP_PORT || 3001;
app.listen(HTTP_PORT, () => console.log(`Listening on port ${HTTP_PORT}`));

//HTTP_PORT=3002 P2P_PORT=5002 PEERS=ws://localhost:5001 npm run dev
//HTTP_PORT=3003 P2P_PORT=5003 PEERS=ws://localhost:5001,ws://localhost:5002 npm run dev