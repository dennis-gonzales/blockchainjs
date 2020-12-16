const Block = require('./block');

class Blockchain {

    constructor() {
        this.chain = [Block.genesis()];
    }

    currentBlock = () => this.chain[this.chain.length - 1];

    addBlock(data) {
        const newBlock = Block.mineBlock(this.currentBlock(), data);
        this.chain.push(newBlock);

        return newBlock;
    }

    isValidChain(chain) {
        /// converts object to string representation and compare values
        if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) {
            /// returns false if the index 0 is not the genesis block
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
                return false;
            }

            /// check if the current block `lastBlock.hash`
            /// is valid using the SHA256 algorithm
            /// passing in the timestamp, lastHash, data
            const { timestamp, lastHash, data } = block;
            if (block.hash !== Block.hash(timestamp, lastHash, data)) {
                return false;
            }
        }

        return true;
    }

    replaceChain(newChain) {
        /// check if the `newChain` is updated
        if (newChain.length <= this.chain.length) {
            console.log('Received chain is outdated or already up to date\nWill not replace the chain...');
        } else {
            /// check if `newChain` is a valid chain
            const isValid = this.isValidChain(newChain);

            if (isValid) {
                console.log('Chain is sucessfully updated...');
                this.chain = newChain;
            } else {
                console.log('The chain is corrupted...');
            }
        }
    }
}

module.exports = Blockchain;