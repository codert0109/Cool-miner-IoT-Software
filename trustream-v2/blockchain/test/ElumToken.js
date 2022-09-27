const { expect } = require('chai');

const BN = ethers.BigNumber.from;

describe("ElumToken contract", function () {
  let owner, addr1, addr2;
  let hardhatElumToken;
  let hardhatElumNFT;
  let hardhatElumStaking;

  beforeEach(async function() {
    [owner, addr1, addr2] = await ethers.getSigners();

    const ElumToken = await ethers.getContractFactory("ElumToken");
    const TokenPrice = BN('10000000000000000000');
    hardhatElumToken = await ElumToken.deploy(TokenPrice);
    await hardhatElumToken.buyTokens(100, { value : (TokenPrice.mul(100)).toString()});

    const ElumNFT = await ethers.getContractFactory("ElumNFT");
    hardhatElumNFT = await ElumNFT.deploy();

    const ElumStaking = await ethers.getContractFactory("ElumStaking");
    hardhatElumStaking = await ElumStaking.deploy()
    hardhatElumStaking.setTokenAddress(hardhatElumToken.address);
    hardhatElumStaking.setNFTAddress(hardhatElumNFT.address);
  });

  it("BuyTokens should work.", async function () {
    
  });
});