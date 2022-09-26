const { expect } = require('chai');

const BN = ethers.BigNumber.from;

describe("ElumToken contract", function () {
  it("BuyTokens should work.", async function () {
    const [owner] = await ethers.getSigners();
    const ElumToken = await ethers.getContractFactory("ElumToken");
    const TokenPrice = BN('10000000000000000000');
    const hardhatElumToken = await ElumToken.deploy(TokenPrice);
    await expect(hardhatElumToken.buyTokens(100))
        .to.be.revertedWith('Not enough payment.');
    
    await hardhatElumToken.buyTokens(100, { value : TokenPrice.multiply(100)});
  });
});