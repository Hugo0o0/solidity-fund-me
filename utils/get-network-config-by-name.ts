import { networkConfig } from "../hardhat-helper-config";

const getNetworkConfigByName = (name: string) => {
  console.log(name);

  const { address, blockConfirmations } =
    networkConfig[name as keyof typeof networkConfig];

  return { address, blockConfirmations };
};

export default getNetworkConfigByName;
