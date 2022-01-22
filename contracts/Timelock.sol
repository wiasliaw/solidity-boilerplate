// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Timelock {
    uint256 private _value;
    uint256 public timestamp;

    modifier isNotLock() {
        // solhint-disable-next-line
        require(block.timestamp >= (timestamp + 1 weeks), "Locked");
        _;
    }

    function get() external view returns (uint256) {
        return _value;
    }

    function set(uint256 value_) external isNotLock {
        // solhint-disable-next-line
        timestamp = block.timestamp;
        _value = value_;
    }

    function endTime() external view returns (uint256) {
        return timestamp + 1 weeks;
    }
}
