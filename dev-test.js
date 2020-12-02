const Block = require('./block');

const fooBlock = Block.mineBlock(Block.genesis(), 'Foo!');

console.log(fooBlock.toString());