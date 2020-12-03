const express = require('express');
const path = require('path');
const logger = require('./middleware/logger');

const app = express();

app.use(express.json()); // body parser for post requests
app.use(express.static(path.join(__dirname, '../public')));

// middlewares
app.use(logger);
app.use('/blocks', require('./routes/api/blocks'));

const HTTP_PORT = process.env.PORT || 3001;
app.listen(HTTP_PORT, () => console.log(`Listening on port ${HTTP_PORT}`));