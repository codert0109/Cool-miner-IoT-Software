// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

interface IElumNFT {
    function isOwner(address _address, uint256 nftID) external view returns (bool);
}