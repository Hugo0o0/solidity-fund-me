// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

import './PriceConverter.sol';
import '@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol';

error FundMe__Unauthorized();
error FundMe__DidNotSendEnoughEth();

contract FundMe {
    using PriceConverter for uint256;

    uint256 public constant MIN_USD = 10 * 1e18;
    address[] public funders;
    mapping(address => uint256) public funderBalance;
    address public immutable owner;
    AggregatorV3Interface public immutable priceFeed;

    modifier onlyOwner() {
        if (msg.sender != owner) {
            revert FundMe__Unauthorized();
        }
        _;
    }

    constructor(address priceFeedAddress) {
        owner = msg.sender;
        priceFeed = AggregatorV3Interface(priceFeedAddress);
    }

    receive() external payable {
        fund();
    }

    fallback() external payable {
        fund();
    }

    function fund() public payable {
        if (msg.value.getConversionRate(priceFeed) > MIN_USD) {
            revert FundMe__DidNotSendEnoughEth();
        }
        funders.push(msg.sender);
        funderBalance[msg.sender] += msg.value;
    }

    function withdraw() public onlyOwner {
        for (uint256 i; i < funders.length; i++) {
            address funder = funders[i];
            funderBalance[funder] = 0;
        }

        (bool callSuccess, ) = payable(msg.sender).call{
            value: address(this).balance
        }('');
        require(callSuccess, 'Call Failed');
    }
}
