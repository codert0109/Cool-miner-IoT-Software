// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./interfaces/IElumToken.sol";

contract Reward is Ownable {
    address public tokenContract;

    constructor() {
    }

    function setTokenContract(address _tokenContract) public virtual onlyOwner {
        tokenContract = _tokenContract;
    }

    // temporary function
    // mint 
    function mint(address to, uint256 amount) public virtual onlyOwner {
        IElumToken(tokenContract).mintRewardTokens(amount);
        IElumToken(tokenContract).transfer(to, amount);
    }
}