import { DeploymentsExtension } from 'hardhat-deploy/dist/types'

const getPriceFeedForDevChain = async (deployments: DeploymentsExtension) => {
  const aggregator = await deployments.get('MockV3Aggregator')
  return aggregator.address
}

export default getPriceFeedForDevChain
