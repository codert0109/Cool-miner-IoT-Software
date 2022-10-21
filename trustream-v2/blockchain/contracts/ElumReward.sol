// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./interfaces/IElumToken.sol";
import "./interfaces/IElumNFT.sol";

contract ElumReward is Ownable {
    uint256 public constant unit = 10 ** 18;
    uint256 public constant EPOCH_SECONDS = 60 * 60;    // 3600s = 1hr
    uint256 public constant DISTRIBUTE_TOKEN = 2000 * unit;
    uint256 public constant MAX_TOKEN_COEFF = 50;       // We restrict that a miner can get 
                                                        // DISTRIBUTE_TOKEN / TOT_NFT * 50 tokens at maxium in each epoch.

    address public tokenContract;
    address public nftContract;

    mapping (address => uint256) public claimedToken;
    mapping (address => uint256) public claimedTime;

    uint256 public deployedTime;

    constructor() {
        deployedTime = block.timestamp;
    }

    // onlyOwner API
    function mint(address to, uint256 amount) internal virtual {
        IElumToken(tokenContract).mintRewardTokens(amount);
        IElumToken(tokenContract).transfer(to, amount);
    }

    // onlyOwner API
    function setTokenAddress(address _tokenContract) public virtual onlyOwner {
        tokenContract = _tokenContract;
    }

    // onlyOwner API
    function setNFTAddress(address _nftContract) public virtual onlyOwner {
        nftContract   = _nftContract;
    }

    // User API Function
    function verify(address to, uint256 amount, uint8 _v, bytes32 _r, bytes32 _s) external pure virtual returns (address) {
        bytes memory prefix = "\x19Ethereum Signed Message:\n32";
        bytes32 prefixedHashMessage = keccak256(abi.encodePacked(prefix, keccak256(abi.encode(to, amount))));
        address signer = ecrecover(prefixedHashMessage, _v, _r, _s);
        return signer;
    }

    // User API Function
    function getMaxAvailableToken(address to) public virtual view returns (uint256) {
        uint256 totalNFTCnt = IElumNFT(nftContract).getTotalNFT();

        if (totalNFTCnt == 0)
            return 0;
            
        require (totalNFTCnt > 0, "totalNFT should be positive number.");

        uint256 lastClaimedTime = deployedTime;
        if (claimedTime[to] != 0)
            lastClaimedTime = claimedTime[to];
            
        uint256 epochCnt = (block.timestamp - lastClaimedTime) / EPOCH_SECONDS;

        if (epochCnt == 0) 
            epochCnt = 1;

        return DISTRIBUTE_TOKEN * MAX_TOKEN_COEFF * epochCnt / totalNFTCnt;
    }

    // User API Function
    function claimRequest(address to, uint256 amount, uint8 _v, bytes32 _r, bytes32 _s) public virtual returns (bool) {
        require (this.verify(to, amount, _v, _r, _s) == owner(), "signature check failed");
        require (amount > 0, "amount should be positive.");
        require (to != address(0), "address cannot be zero.");
        require (claimedToken[to] < amount, "claimed token should be less than amount.");

        // Removed feature for testing...
        // require (claimedToken[to] + getMaxAvailableToken(to) > amount);

        // Transfer tokens
        mint(to, amount - claimedToken[to]);

        // Update claimed info
        claimedTime[to] = block.timestamp;
        claimedToken[to] = amount;
        return true;
    }
}