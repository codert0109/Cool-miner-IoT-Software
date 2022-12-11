const { expect } = require('chai');

const BN = ethers.BigNumber.from;

describe("ElumNFT contract", function () {
  it("Mint should check ids and amounts length.", async function () {
    const [owner] = await ethers.getSigners();
    const ElumNFT = await ethers.getContractFactory("ElumNFT");
    const hardhatElumNFT = await ElumNFT.deploy();
    await expect(hardhatElumNFT.mint([0], [100, 200]))
        .to.be.revertedWith('Id and Amount array length should be equal.');
  });

  it("Mint should check id less than NFT_TYPE_COUNTER", async function () {
    const [owner] = await ethers.getSigners();
    const ElumNFT = await ethers.getContractFactory("ElumNFT");
    const hardhatElumNFT = await ElumNFT.deploy();
    await expect(hardhatElumNFT.mint([0], [100]))
        .to.be.revertedWith('id should be less than NFT_TYPE_COUNTER');
  });

  it("Mint should work", async function () {
    const [owner] = await ethers.getSigners();
    const ElumNFT = await ethers.getContractFactory("ElumNFT");
    const hardhatElumNFT = await ElumNFT.deploy();
    await hardhatElumNFT.addNewType('https://testminer.elumicate.com/api/metadata/NFT/{id}.json',3);
    await hardhatElumNFT.mint([0], [2]);

    expect(await hardhatElumNFT.balanceOf(owner.address)).to.eql([]);
    await hardhatElumNFT.affectWhiteList([owner.address], true);

    await hardhatElumNFT.buyNFT(0, 2, { value : (BN(3) * BN(2) * BN('1000000000000000000')).toString() });
    expect(await hardhatElumNFT.balanceOf(owner.address)).to.be.eql([BN(0), BN(1)]);
  });

  it("Transfer should work", async function () {
    const [owner, address1, address2] = await ethers.getSigners();
    const ElumNFT = await ethers.getContractFactory("ElumNFT");
    const hardhatElumNFT = await ElumNFT.deploy();
    await hardhatElumNFT.addNewType('https://testminer.elumicate.com/api/metadata/NFT/{id}.json', 3);
    await hardhatElumNFT.addNewType('https://testminer.elumicate.com/api/metadata/NFT/{id}.json', 5);

    await hardhatElumNFT.mint([0], [2]);
    await hardhatElumNFT.mint([1], [5]);

    await hardhatElumNFT.affectWhiteList([owner.address], true);
    expect(await hardhatElumNFT.balanceOf(owner.address)).to.eql([]);

    await hardhatElumNFT.buyNFT(0, 2, { value : (BN(3) * BN(2) * BN('1000000000000000000')).toString() });
    await hardhatElumNFT.buyNFT(1, 3, { value : (BN(5) * BN(3) * BN('1000000000000000000')).toString() });
    expect(await hardhatElumNFT.balanceOf(owner.address))
        .to.be.eql([BN(0), BN(1), BN(2), BN(3), BN(4)]);

    await expect(hardhatElumNFT.transferNFT([2], address1.address))
        .to.be.revertedWith('dst address should be in the approved list.');

    await hardhatElumNFT.affectWhiteList([address1.address], true);

    await hardhatElumNFT.transferNFT([2], address1.address);
    
    expect(await hardhatElumNFT.balanceOf(address1.address))
        .to.be.eql([BN(2)]);

    expect(await hardhatElumNFT.balanceOf(owner.address))
        .to.be.eql([BN(0), BN(1), BN(4), BN(3)]);

    await expect(hardhatElumNFT.transferNFT([1, 2], address1.address))
        .to.be.revertedWith('Src are not the owner.');
    
    await hardhatElumNFT.transferNFT([1, 4], address1.address);

    expect(await hardhatElumNFT.balanceOf(address1.address))
        .to.be.eql([BN(2), BN(1), BN(4)]);

    expect(await hardhatElumNFT.balanceOf(owner.address))
        .to.be.eql([BN(0), BN(3)]);

    await hardhatElumNFT.connect(address1).transferNFT([2], owner.address);

    expect(await hardhatElumNFT.balanceOf(address1.address))
        .to.be.eql([BN(4), BN(1)]);

    expect(await hardhatElumNFT.balanceOf(owner.address))
        .to.be.eql([BN(0), BN(3), BN(2)]);
  });
});