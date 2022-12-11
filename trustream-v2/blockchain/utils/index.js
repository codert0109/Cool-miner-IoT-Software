module.exports = {
    timestamp : async function() {
        const blockNumBefore = await ethers.provider.getBlockNumber();
        const blockBefore = await ethers.provider.getBlock(blockNumBefore);
        return blockBefore.timestamp;
    },
    forwardTime : async function(seconds) {
        await network.provider.send("evm_increaseTime", [seconds])
        await network.provider.send("evm_mine")
    }
};