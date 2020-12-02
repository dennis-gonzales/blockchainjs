const Block = require('./block');

class Blockchain {

    constructor() {
        this.chain = [Block.genesis()];
    }

    addBlock(data) {
        const newBlock = Block.mineBlock(this.currentBlock(), data);
        this.chain.push(newBlock);

        return newBlock;
    }
    
    currentBlock() {
        return this.chain[this.chain.length - 1];
    }

    isValidChain(chain) {
        /// converts object to string representation and compare values
        if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) {
            /// returns false if the index 0 is not the genesis block
            console.log("genesis block");
            return false;
        }

        /// iterate through the chain and validate each block
        /// we start at index 1 
        /// since we already verified the index 0 (genesis block)
        for (let i = 1; i < chain.length; i++) {

            const block = chain[i];
            const lastBlock = chain[i - 1];

            /// check if the previous block `lastBlock.hash`
            /// is not equal to the current block `block.lastHash`
            if (block.lastHash !== lastBlock.hash) {
                console.log("`block.lastHash` mismatch");
                return false;
            }

            /// check if the current block `lastBlock.hash`
            /// is valid using the SHA256 algorithm
            /// passing in the timestamp, lastHash, data
            const { timestamp, lastHash, data } = block;
            if (block.hash !== Block.hash(timestamp, lastHash, data)) {
                console.log("`block.hash` mismatch");
                return false;
            }
        }

        return true;
    }
}

module.exports = Blockchain;