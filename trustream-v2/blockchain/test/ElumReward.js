const { expect } = require('chai');

const BN = ethers.BigNumber.from;

describe("ElumReward contract", function () {
  it("It should check signature.", async function () {
    const [owner] = await ethers.getSigners();
    
    console.log({ owner });

    const ElumToken = await ethers.getContractFactory("ElumToken");
    const TokenPrice = BN('10000000000000000000');
    hardhatElumToken = await ElumToken.deploy(TokenPrice);
    await hardhatElumToken.buyTokens(100, { value : (TokenPrice.mul(100)).toString()});

    const ElumReward = await ethers.getContractFactory("ElumReward");
    const hardhatElumReward = await ElumReward.deploy();
    await hardhatElumReward.setTokenAddress(hardhatElumToken.address)

    await hardhatElumToken.setRewardAddress(hardhatElumReward.address)
  });

  it("getMaxAvailableToken should meaningful value.", async function () {
    const [owner] = await ethers.getSigners();

    const ElumNFT = await ethers.getContractFactory("ElumNFT");
    const hardhatElumNFT = await ElumNFT.deploy();
    await hardhatElumNFT.addNewType('https://testminer.elumicate.com/api/metadata/NFT/{id}.json', 3);
    await hardhatElumNFT.addNewType('https://testminer.elumicate.com/api/metadata/NFT/{id}.json', 5);

    const ElumToken = await ethers.getContractFactory("ElumToken");
    const TokenPrice = BN('10000000000000000000');
    hardhatElumToken = await ElumToken.deploy(TokenPrice);

    const ElumReward = await ethers.getContractFactory("ElumReward");
    const hardhatElumReward = await ElumReward.deploy();
    await hardhatElumReward.setTokenAddress(hardhatElumToken.address)
    await hardhatElumReward.setNFTAddress(hardhatElumNFT.address)
    
    await hardhatElumToken.setRewardAddress(hardhatElumReward.address)

    expect(await hardhatElumReward.getMaxAvailableToken(owner.address)).to.be.eql(BN(0));
  });
});