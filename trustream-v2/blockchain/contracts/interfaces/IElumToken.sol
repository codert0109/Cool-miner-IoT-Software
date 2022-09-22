// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

interface IElumToken is IERC20 {
    function setRewardContract(address _rewardContract) external;
    function mintRewardTokens(uint256 amount) external;
}