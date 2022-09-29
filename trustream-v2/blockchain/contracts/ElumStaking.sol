// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./interfaces/IElumNFT.sol";
import "./AppStorage.sol";

contract ElumStaking is Ownable{
    address public token_address;

    STAKE_TYPE[] public stakeTypeList;
    mapping (address => STAKE_INFO) public ADDRESS_TO_INFO;

    /* Begin OnlyOwner Module */
    function setTokenAddress(address _token_address) public virtual onlyOwner {
        require (_token_address != address(0), "invalid token address");
        token_address = _token_address;
    }

    function addStakeType(uint256 period) public virtual onlyOwner {
        STAKE_TYPE memory stakeItem;

        stakeItem.id = stakeTypeList.length;
        stakeItem.period = period;

        stakeTypeList.push(stakeItem);
    }

    function addStakeTypeList(  uint256[] calldata period) public virtual onlyOwner {        
        for (uint i = 0; i < period.length; i++) 
            addStakeType(period[i]);
    }

    function updateStakeType(uint index, uint256 period) public virtual onlyOwner {
        require (index < stakeTypeList.length, "index should be less than stakeTypeList.length");

        stakeTypeList[index].period = period;
    }

    /* End OnlyOwner Module */

    /* Begin User Module */
    function withdrawStaker(address _address) public virtual {
        require (ADDRESS_TO_INFO[_address].amount > 0, "Staking Amount should be positive number.");
        require (ADDRESS_TO_INFO[_address].expireTime <= block.timestamp, "Staking Period hasn't expired.");

        IERC20(token_address).transfer(_address, ADDRESS_TO_INFO[_address].amount);
        ADDRESS_TO_INFO[_address].amount = 0;
    }

    function stake(uint stakeType, uint amount) public virtual {
        require (stakeType < stakeTypeList.length, "StakeType should be less than stakeTypeList.length");
        require(IERC20(token_address).allowance(msg.sender, address(this)) >= amount, "Amount of Tokens should be allowed.");

        uint newPeriod = stakeTypeList[stakeType].period;

        if (ADDRESS_TO_INFO[msg.sender].amount > 0) {
            uint oldPeriod = stakeTypeList[ADDRESS_TO_INFO[msg.sender].type_id].period;
            require(oldPeriod <= newPeriod, "Period can only be extended.");
        }

        IERC20(token_address).transferFrom(msg.sender, address(this), amount);

        ADDRESS_TO_INFO[msg.sender].type_id = stakeType;
        ADDRESS_TO_INFO[msg.sender].startTime = block.timestamp;
        ADDRESS_TO_INFO[msg.sender].expireTime = block.timestamp + newPeriod;
        ADDRESS_TO_INFO[msg.sender].amount += amount;
    }

    function getStakeTypeList() public view returns(STAKE_TYPE[] memory) {
        return stakeTypeList;
    }

    /* End User Module */
}