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
}

struct STAKE_INFO {
    uint256 type_id;        // reference id for staking type
    uint256 startTime;      // the time that staker start
    uint256 expireTime;     // expireTime - startTime can be different 
                            // with stake type period because the period can be updated any time.
    uint256 amount;         // this can be any number.
}