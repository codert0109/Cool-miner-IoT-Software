// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./AppStorage.sol";

contract Staking is Ownable{
    address public token_address;
    address public nft_address;

    STAKE_TYPE[] public stakeTypeList;

    /* Begin OnlyOwner Module */
    function setAddress(address _token_address, address _nft_address) public virtual onlyOwner {
        require (_token_address != address(0), "invalid token address");
        require (_nft_address != address(0), "invalid nft address");
        token_address = _token_address;
        nft_address = _nft_address;
    }

    function addStakeType(uint256 period, uint256 amount, uint256 multiplier) public virtual onlyOwner {
        require (multiplier >= 10000, "Multiplier should be greater than 1.0");
        STAKE_TYPE memory stakeItem;

        stakeItem.period = period;
        stakeItem.amount = amount;
        stakeItem.multiplier = multiplier;

        stakeTypeList.push(stakeItem);
    }

    function updateStakeType(uint index, uint256 period, uint256 amount, uint256 multiplier) public virtual onlyOwner {
        require (index < stakeTypeList.length, "index should be less than stakeTypeList.length");
        require (multiplier >= 10000, "Multiplier should be greater than 1.0");

        stakeTypeList[index].period = period;
        stakeTypeList[index].amount = amount;
        stakeTypeList[index].multiplier = multiplier;
    }
    /* End OnlyOwner Module */

    function stakeNFT(uint nftID, uint256 stakeType) public virtual {

    }
}