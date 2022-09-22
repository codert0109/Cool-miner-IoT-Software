// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract TestCapacity {
    mapping (address => uint) balances;

    constructor() {

    }

    function addRewardTransactions(address[] memory addressList, uint[] memory balanceList) public {
        require (addressList.length == balanceList.length, "address and balance length should be the same.");
        for (uint i = 0; i < balanceList.length; i++) {
            balances[addressList[i]] += balanceList[i];
        }
    }
}