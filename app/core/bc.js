const Blockchain = require('../../blockchain');

const bc = new Blockchain();
bc.addBlock('Hello World!');

module.exports = bc;