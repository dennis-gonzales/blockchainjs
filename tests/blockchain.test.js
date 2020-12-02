const Block = require('../block');
const Blockchain = require('../blockchain');

describe('Blockchain', () => {

    let blockchain;
    let chichain;

    beforeEach(() => {
        blockchain = new Blockchain();
        chichain = new Blockchain();
    });

    it('should starts with the genesis block', () => {
        expect(blockchain.currentBlock()).toEqual(Block.genesis());
    });
    

    it('should add a new block', () => {
        const data = 'Thicc Thighs Saves Lives';
        blockchain.addBlock(data);

        expect(blockchain.currentBlock().data).toEqual(data);
    });

    it('validates a valid chain', () => {
        chichain.addBlock('Oppai is Truth');

        expect(blockchain.isValidChain(chichain.chain)).toBe(true);
    });

    it('invalidates a corrupted chain', () => {
        chichain.addBlock('Oppai is Truth');
        chichain.currentBlock().data = 'Flat is not justice';

        expect(blockchain.isValidChain(chichain.chain)).toBe(false);
    });

    it('invalidates a corrupted genesis block', () => {
        chichain.currentBlock().data = 'Flat is not justice';

        expect(blockchain.isValidChain(chichain.chain)).toBe(false);
    });
    
});