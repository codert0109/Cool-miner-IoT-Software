const { expect } = require('chai')
const { timestamp, forwardTime } = require('../utils');

const BN = ethers.BigNumber.from

describe('ElumStaking contract', function () {
  let owner, addr1, addr2
  let hardhatElumToken
  let hardhatElumNFT
  let hardhatElumStaking

  beforeEach(async function () {
    ;[owner, addr1, addr2] = await ethers.getSigners()

    const ElumToken = await ethers.getContractFactory('ElumToken')
    const TokenPrice = BN('10000000000000000000')
    hardhatElumToken = await ElumToken.deploy(TokenPrice)
    await hardhatElumToken.buyTokens(200, {
      value: TokenPrice.mul(200).toString(),
    })

    const ElumNFT = await ethers.getContractFactory('ElumNFT')
    hardhatElumNFT = await ElumNFT.deploy()
    await hardhatElumNFT.addNewType(
      'https://testminer.elumicate.com/api/metadata/NFT/{id}.json',
      3,
    )
    await hardhatElumNFT.mint([0], [3])
    await hardhatElumNFT.affectWhiteList(
      [owner.address, addr1.address, addr2.address],
      true,
    )
    await hardhatElumNFT.buyNFT(0, 2, { value: 6 })

    const ElumStaking = await ethers.getContractFactory('ElumStaking')
    hardhatElumStaking = await ElumStaking.deploy()
    await hardhatElumStaking.setTokenAddress(hardhatElumToken.address)
  })

  it('Staking NFT Function Test.', async function () {
    await expect(hardhatElumStaking.stake(0, 0)).to.be.revertedWith(
      'StakeType should be less than stakeTypeList.length',
    )

    await hardhatElumStaking.addStakeType(86400 * 45)
    await hardhatElumStaking.addStakeType(86400 * 90)

    await expect(hardhatElumStaking.stake(0, 10)).to.be.revertedWith('Amount of Tokens should be allowed.')

    await hardhatElumToken.approve(hardhatElumStaking.address, 10)

    await hardhatElumStaking.stake(0, 10)

    let result1 = await hardhatElumStaking.ADDRESS_TO_INFO(owner.address)

    expect(result1.type_id).to.be.eql(BN(0))
    expect(result1.startTime).to.be.eql(BN(await timestamp()))
    expect(result1.expireTime).to.be.eql(BN(await timestamp()).add(BN(86400 * 45)))
    expect(result1.amount).to.be.eql(BN(10))

    await expect (hardhatElumStaking.withdrawStaker(owner.address))
            .to.be.revertedWith("Staking Period hasn't expired.");

    await forwardTime(86400 * 44);

    await expect (hardhatElumStaking.withdrawStaker(owner.address))
            .to.be.revertedWith("Staking Period hasn't expired.");

    expect (await hardhatElumToken.balanceOf(owner.address))
            .to.be.equal(BN(190));

    await forwardTime(86400);
    await hardhatElumStaking.withdrawStaker(owner.address);

    expect (await hardhatElumToken.balanceOf(owner.address))
            .to.be.equal(BN(200));

    await hardhatElumToken.approve(hardhatElumStaking.address, 10)
    await hardhatElumStaking.stake(0, 0)
  })
})
