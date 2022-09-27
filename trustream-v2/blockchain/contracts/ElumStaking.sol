// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./interfaces/IElumNFT.sol";
import "./AppStorage.sol";

contract ElumStaking is Ownable{
    address public token_address;
    address public nft_address;

    STAKE_TYPE[] public stakeTypeList;
    mapping (uint => STAKE_INFO) public NFT_TO_INFO;

    /* Begin OnlyOwner Module */
    function setTokenAddress(address _token_address) public virtual onlyOwner {
        require (_token_address != address(0), "invalid token address");
        token_address = _token_address;
    }

    function setNFTAddress(address _nft_address) public virtual onlyOwner {
        require (_nft_address != address(0), "invalid nft address");
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

    function addStakeTypeList(  uint256[] calldata period, 
                                uint256[] calldata amount, 
                                uint256[] calldata multiplier) public virtual onlyOwner {
        require (period.length == amount.length && amount.length == multiplier.length,
            "period & amount & multiplier length should be equal.");
        
        for (uint i = 0; i < period.length; i++) 
            addStakeType(period[i], amount[i], multiplier[i]);
    }

    function updateStakeType(uint index, uint256 period, uint256 amount, uint256 multiplier) public virtual onlyOwner {
        require (index < stakeTypeList.length, "index should be less than stakeTypeList.length");
        require (multiplier >= 10000, "Multiplier should be greater than 1.0");

        stakeTypeList[index].period = period;
        stakeTypeList[index].amount = amount;
        stakeTypeList[index].multiplier = multiplier;
    }
    /* End OnlyOwner Module */

    /* Begin System Module */
    function _withdrawStaker(uint nftID) internal virtual {
        address staker = NFT_TO_INFO[nftID].staker;
        if (staker == address(0)) 
            return;
        IERC20(token_address).transfer(staker, NFT_TO_INFO[nftID].amount);
        NFT_TO_INFO[nftID].type_id = 0;
        NFT_TO_INFO[nftID].startTime = 0;
        NFT_TO_INFO[nftID].staker = address(0);
        NFT_TO_INFO[nftID].amount = 0;
    }
    /* End System Module */

    /* Begin User Module */
    function isStakingExist(uint nftID) public view returns (bool) {
        // No staker assigned to this NFT ID.
        if (NFT_TO_INFO[nftID].staker == address(0))
            return false;
        
        uint256 stake_type = NFT_TO_INFO[nftID].type_id;

        // Required amount is higher than current staking.
        // This can be happen if Admin increase the required staking amount. 
        if (NFT_TO_INFO[nftID].amount < stakeTypeList[stake_type].amount)
            return false;

        // The staking period has been expired.
        if (block.timestamp - NFT_TO_INFO[nftID].startTime >= stakeTypeList[stake_type].period)
            return false;

        return true;
    }

    modifier NFTAccess(uint nftID) {
        require (IElumNFT(nft_address).isOwner(msg.sender, nftID), "You should be the NFT Owner.");
        require (!isStakingExist(nftID) || NFT_TO_INFO[nftID].staker == msg.sender, 
                    "Staker is another person.");
        _;
    }

    function withdrawStaker(uint nftID) public virtual {
        require (isStakingExist(nftID) == false, "Cannot withdraw staking Tokens.");
        require (NFT_TO_INFO[nftID].staker != address(0), "Nothing to withdraw.");
        _withdrawStaker(nftID);
    }

    function withdrawToken(uint nftID) public virtual {
        require (isStakingExist(nftID) == true, "Call withdrawStaker insteadOf withdrawToken.");
        require (NFT_TO_INFO[nftID].staker != address(0), "no staker here");

        uint256 stake_type = NFT_TO_INFO[nftID].type_id;
        require (NFT_TO_INFO[nftID].amount > stakeTypeList[stake_type].amount, "Nothing to withdraw.");

        uint256 amount = NFT_TO_INFO[nftID].amount - stakeTypeList[stake_type].amount;

        IERC20(token_address).transfer(NFT_TO_INFO[nftID].staker, amount);
    }

    function stakeNFT(uint nftID, uint256 stakeType) public virtual NFTAccess(nftID) {

        require (stakeType < stakeTypeList.length, "stakeType should be less than stakeTypeList.length");

        uint256 newAmount = stakeTypeList[stakeType].amount;
        uint256 newPeriod = stakeTypeList[stakeType].period;

        if (isStakingExist(nftID)) { // checks if it's possible to stake or restake.
            address staker = NFT_TO_INFO[nftID].staker;

            // Thanks to NFTAccess modifier, this should be never happen.
            require(staker == msg.sender, "Staker already exist");

            uint256 oldType = NFT_TO_INFO[nftID].type_id;
            uint256 oldAmount = stakeTypeList[oldType].amount;
            uint256 oldPeriod = stakeTypeList[oldType].period;

            require (oldAmount <= newAmount && oldPeriod <= newPeriod, "Can only be upgradable.");

            uint256 curAmount = NFT_TO_INFO[nftID].amount;
            require (oldAmount <= curAmount, "Internal Error: oldAmount should be less than curAmount");

            uint256 requireAmount = (newAmount > curAmount ? newAmount - curAmount : 0);

            // Checks if msg.sender can send requiredAmount of ElumToken to our contract.
            require(IERC20(token_address).allowance(msg.sender, address(this)) >= requireAmount, "Required Amount of Tokens should be allowed.");

            // # Cond1
            if (requireAmount > 0)
                IERC20(token_address).transferFrom(msg.sender, address(this), requireAmount);

            uint256 leftAmount = requireAmount + curAmount - newAmount;

            // # Cond2
            if (leftAmount > 0)
                IERC20(token_address).transfer(msg.sender, leftAmount);

            // !INFORMATION: Cond1 and Cond2 will not satisfy together.

            // Update Stake Info
            NFT_TO_INFO[nftID].amount       = newAmount;
            NFT_TO_INFO[nftID].type_id      = stakeType;
            NFT_TO_INFO[nftID].staker       = msg.sender;
            NFT_TO_INFO[nftID].startTime    = block.timestamp;
        } else {
            _withdrawStaker(nftID);

            // Update Stake Info
            require(IERC20(token_address).allowance(msg.sender, address(this)) >= newAmount, "Required Amount of Tokens should be allowed.");
            IERC20(token_address).transferFrom(msg.sender, address(this), newAmount);

            NFT_TO_INFO[nftID].staker       = msg.sender;
            NFT_TO_INFO[nftID].amount       = newAmount;
            NFT_TO_INFO[nftID].type_id      = stakeType;
            NFT_TO_INFO[nftID].startTime    = block.timestamp;
        }
    }
    /* End User Module */
}