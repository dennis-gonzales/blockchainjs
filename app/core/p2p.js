const P2pServer = require('../p2pserver');
const bc = require('./bc');

const p2pserver = new P2pServer(bc);

p2pserver.listen();

module.exports = p2pserver;