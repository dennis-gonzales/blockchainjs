const Block = require('../block.js');

describe('Block', () => {

    let data, lastBlock, block;

    beforeEach(() => {
        data = 'Thicc Thighs';
        lastBlock = Block.genesis();
        block = Block.mineBlock(lastBlock, data);
    });

    it('block `data` has been set', () => {
        expect(block.data).toEqual(data);
    });

    it('block `lastHash` is set to previous block', () => {
        expect(block.lastHash).toEqual(lastBlock.hash);
    });
});
