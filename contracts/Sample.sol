// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Sample {
    address private owner;

    constructor() {
        owner = msg.sender;
    }

    function getOwner() public view returns (address) {
        return owner;
    }

    function getBalance() public view returns (uint256) {
        return owner.balance;
    }
}