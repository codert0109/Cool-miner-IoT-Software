// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract NFT is Ownable {
    // Special Case of ERC1155

    uint public maxNormalSupply = 0;
    uint public priceNormalNFT = 0;
    uint public totalNormalSupply = 0;
    mapping (address => uint256) normalBalance;
    
    uint public maxSpecialSupply = 0;
    uint public priceSpecialNFT = 0;
    uint public totalSpecialSupply = 0;
    mapping (address => uint256) specialBalance;

    address private token_address;

    constructor(address _token_address,
                uint256 _maxNormalSupply, 
                uint256 _priceNormalNFT, 
                uint256 _maxSpecialSupply, 
                uint256 _priceSpecialNFT) {
        require(_token_address != address(0), "invalid token address");

        // require(_priceNormalNFT != 0, "Price of Normal NFT should be positive.");
        // require(_priceSpecialNFT != 0, "Price of Special NFT should be positive.");
        
        token_address = _token_address;

        maxNormalSupply = _maxNormalSupply;
        maxSpecialSupply = _maxSpecialSupply;

        priceNormalNFT = _priceNormalNFT;
        priceSpecialNFT = _priceSpecialNFT;
    }

    /* Begin OnlyOwner Module */
    function setMaxNormalSupply(uint256 _maxNormalSupply) public virtual onlyOwner {
        require (_maxNormalSupply >= totalNormalSupply, "maxNormalSupply should be greater than totalNormalSupply");
        maxNormalSupply = _maxNormalSupply;
    }

    function setMaxSpecialSupply(uint _maxSpecialSupply) public virtual onlyOwner {
        require (_maxSpecialSupply >= totalSpecialSupply, "maxSpecialSupply should be greater than totalSpecialSupply");
        maxSpecialSupply = _maxSpecialSupply;
    }

    function setSpecialPrice(uint _priceSpecialNFT) public virtual onlyOwner {
        require (_priceSpecialNFT >= priceNormalNFT);
        priceSpecialNFT = _priceSpecialNFT;
    }

    function setNormalPrice(uint _priceNormalNFT) public virtual onlyOwner {
        priceNormalNFT = _priceNormalNFT;
    }

    function setTokenAddress(address _token_address) public virtual onlyOwner {
        require (_token_address != address(0), "invalid token address");
        token_address = _token_address;
    }

    /* End OnlyOwner Module */

    /* Begin User Module */
    function verifyNFT(uint256 _normalNFTCnt, uint256 _specialNFTCnt) public virtual payable returns (bool) {
        // check if it is possible to buy
        require (totalNormalSupply + _normalNFTCnt <= maxNormalSupply, "not enough normal NFTs left");
        require (totalSpecialSupply + _specialNFTCnt <= maxSpecialSupply, "not enough special NFTs left");

        uint256 bid_price = _normalNFTCnt * priceNormalNFT + _specialNFTCnt * priceSpecialNFT;

        require (msg.value >= bid_price, "not enough balance");

        // payable(address(this)).transfer(bid_price);

        totalNormalSupply += _normalNFTCnt;
        totalSpecialSupply += _specialNFTCnt;

        normalBalance[msg.sender] += _normalNFTCnt;
        specialBalance[msg.sender] += _specialNFTCnt;

        return true;
    }

    function transferNFT(uint256 _normalNFTCnt, uint256 _specialNFTCnt, address to) public virtual returns (bool) {
        // check if it is possible to transfer
        require (normalBalance[msg.sender] <= _normalNFTCnt, "not enough normal NFTs to transfer");
        require (specialBalance[msg.sender] <= _specialNFTCnt, "not enough special NFTs to transfer");
        require (to != address(0), "invalid transfer address");

        normalBalance[msg.sender] -= _normalNFTCnt;
        normalBalance[to] += _normalNFTCnt;

        specialBalance[msg.sender] -= _specialNFTCnt;
        specialBalance[to] += _specialNFTCnt;
        
        return true;
    }

    function balanceOf(address account) public view virtual returns (uint256 normalNFT, uint256 specialNFT) {
        return (normalBalance[account], specialBalance[account]);
    }

    /* End User Module */
}