// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./interfaces/IElumToken.sol";

contract ElumToken is IElumToken, ERC20, Ownable {
    uint256 constant maxSupply = 20000000000;
    uint256 constant totalRewardSupply = maxSupply * 7 / 10;

    address public rewardContract = address(0);
    uint256 public rewardSupply = 0;

    constructor() ERC20("ElumToken", "Elum") {
    }

    function setRewardContract(address _rewardContract) external override virtual onlyOwner {
        rewardContract = _rewardContract;
    }

    function mintRewardTokens(uint256 amount) external override virtual {
        require (msg.sender == rewardContract);
        require (rewardSupply + amount <= totalRewardSupply);

        _mint(msg.sender, amount);
    }
}