import { network } from "hardhat";
import { DeployFunction } from "hardhat-deploy/dist/types";
import { devChains } from "../hardhat-helper-config";
import deployToDevChain from "../utils/deploy-to-dev-chain";
import deployToActualChain from "../utils/deploy-to-actual-chain";
import verifyContract from "../utils/verify";
import getNetworkConfigByName from "../utils/get-network-config-by-name";

const func: DeployFunction = async ({ getNamedAccounts, deployments }) => {
  const { deployer } = await getNamedAccounts();
  const isDevChain = devChains.includes(network.name);
  if (isDevChain) {
    await deployToDevChain(deployments, deployer);
  } else {
    const fundMe = await deployToActualChain(deployments, deployer);
    console.log(network.name);
    const { address } = getNetworkConfigByName(network.name);
    await verifyContract(fundMe.address, [address]);
  }
};

func.tags = ["all", "fundme"];

export default func;
