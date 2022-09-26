// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./interfaces/IElumToken.sol";

contract ElumToken is IElumToken, ERC20, Ownable {
    uint256 public constant maxSupply = 20000000000;
    uint256 public constant totalRewardSupply = maxSupply * 7 / 10;
    uint256 public constant totalSaleSupply   = maxSupply * 1 / 10;

    address public rewardContract = address(0);
    uint256 public rewardSupply = 0;
    uint256 public saleSupply = 0;
    uint256 public tokenPrice = 0;

    constructor(uint256 _price) ERC20("ElumToken", "Elum") {
        tokenPrice = _price;
    }

    function setTokenPrice(uint256 newPrice) external virtual onlyOwner {
        tokenPrice = newPrice;
    }

    function setRewardContract(address _rewardContract) external override virtual onlyOwner {
        rewardContract = _rewardContract;
    }

    function buyTokens(uint256 amount) external payable {
        require (msg.value >= amount * tokenPrice, "Not enough payment.");
        require (saleSupply + amount <= totalSaleSupply, "Not enough balance.");
        _mint(msg.sender, amount);
    }

    function mintRewardTokens(uint256 amount) external override virtual {
        require (msg.sender == rewardContract);
        require (rewardSupply + amount <= totalRewardSupply);

        _mint(msg.sender, amount);
    }
}