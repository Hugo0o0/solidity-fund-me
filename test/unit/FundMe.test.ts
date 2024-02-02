import { assert, expect } from "chai";
import { deployments, ethers, getNamedAccounts } from "hardhat";
import { FundMe, MockV3Aggregator } from "../../typechain-types";
import { Address } from "hardhat-deploy/dist/types";

describe("Fund Me", () => {
  let fundMe: FundMe;
  let deployer: Address;
  let aggregator: MockV3Aggregator;
  const sendAmount = ethers.parseEther("1000");
  let contractAddress: Address;

  beforeEach(async () => {
    const contracts = await deployments.fixture(["all"]);
    deployer = (await getNamedAccounts()).deployer;
    fundMe = await ethers.getContractAt("FundMe", contracts.FundMe.address);
    aggregator = await ethers.getContractAt(
      "MockV3Aggregator",
      contracts.MockV3Aggregator.address
    );
    contractAddress = await fundMe.getAddress();
  });

  describe("Constructor", () => {
    it("sets the aggregator correctly", async () => {
      const priceFeedAddress = await fundMe.priceFeed();
      const aggregatorAddress = await aggregator.getAddress();
      assert.equal(priceFeedAddress, aggregatorAddress);
    });
  });

  describe("Fund", () => {
    it("fails if you don't send enough ether", async () => {
      await expect(fundMe.fund()).to.be.reverted;
    });

    it("updated the amound funded data structure", async () => {
      await fundMe.fund({ value: sendAmount });
      const response = await fundMe.funderBalance(deployer);
      assert.equal(response.toString(), sendAmount.toString());
    });

    it("updates the funders array", async () => {
      await fundMe.fund({ value: sendAmount });
      const funders = await fundMe.funders(0);
      assert.equal(funders, deployer);
    });
  });
});
