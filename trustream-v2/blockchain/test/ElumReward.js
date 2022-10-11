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

    // needs to configure local network
    // let result = await hardhatElumReward.claimRequest(
    //                                '0x78D0e460f234efbFc235152d32AB5e31b30B2171',
    //                                '1000',
    //                                '0x1c',
    //                                '0xbeb30c31e5f5e801150dfee456141800960b158062934822806d9fbd41f20848',
    //                                '0x06397c986fd46c943fa3d13e3d56d009922c3a7ba3362d00f175918ef1ce6ee2'
    //                                );
    
    // console.log({ result });  
  });
});