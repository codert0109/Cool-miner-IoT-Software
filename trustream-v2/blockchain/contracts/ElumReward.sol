// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./interfaces/IElumToken.sol";

contract ElumReward is Ownable {
    address public tokenContract;

    constructor() {
    }

    function mint(address to, uint256 amount) internal virtual {
        IElumToken(tokenContract).mintRewardTokens(amount);
        IElumToken(tokenContract).transfer(to, amount);
    }

    function setTokenAddress(address _tokenContract) public virtual onlyOwner {
        tokenContract = _tokenContract;
    }

    function verify(address to, uint256 amount, uint8 _v, bytes32 _r, bytes32 _s) external pure virtual returns (address) {
        bytes memory prefix = "\x19Ethereum Signed Message:\n32";
        bytes32 prefixedHashMessage = keccak256(abi.encodePacked(prefix, keccak256(abi.encode(to, amount))));
        address signer = ecrecover(prefixedHashMessage, _v, _r, _s);
        return signer;
    }

    function claimRequest(address to, uint256 amount, uint8 _v, bytes32 _r, bytes32 _s) public virtual returns (bool) {
        require (this.verify(to, amount, _v, _r, _s) == owner(), "signature check failed");
        require (amount > 0, "amount should be positive.");
        require (to != address(0), "address cannot be zero.");

        mint(to, amount);
        return true;
    }
}