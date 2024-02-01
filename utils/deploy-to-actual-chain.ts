import { DeploymentsExtension } from "hardhat-deploy/dist/types";
import getNetworkConfigByName from "./get-network-config-by-name";
import { network } from "hardhat";

const deployToActualChain = async (
  deployments: DeploymentsExtension,
  deployer: string
) => {
  const { address, blockConfirmations } = getNetworkConfigByName(network.name);
  return await deployments.deploy("FundMe", {
    from: deployer,
    args: [address],
    log: true,
    waitConfirmations: blockConfirmations,
  });
};

export default deployToActualChain;
