// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

struct NFT_TYPE {
    string metadataURI;
    uint256 price;
    uint256 totalSupply;
    uint256 remainSupply;
}

struct NFT_BALANCE {
    uint256[] idList;
}

struct NFT_INFO {
    address owner;
    uint256 nftType;
    uint256 acquireTime;
    uint256 index; // Indicate index of owner.balance array. Very efficient to reduce gas fee.
}

struct STAKE_TYPE {
    uint256 id;
    uint256 period;
    uint256 amount;
    uint256 multiplier; // Decimal 4 which means 14000 indicates 1.4
}