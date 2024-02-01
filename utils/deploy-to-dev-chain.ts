import { DeploymentsExtension } from "hardhat-deploy/dist/types";

const deployToDevChain = async (
  deployments: DeploymentsExtension,
  deployer: string
) => {
  const aggregator = await deployments.get("MockV3Aggregator");
  await deployments.deploy("FundMe", {
    from: deployer,
    args: [aggregator.address],
    log: true,
    waitConfirmations: 1,
  });
};

export default deployToDevChain;
