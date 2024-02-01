import { network } from 'hardhat'
import { DeployFunction } from 'hardhat-deploy/dist/types'
import { DECIMALS, INITIAL_PRICE, devChains } from '../hardhat-helper-config'

const func: DeployFunction = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments
  const { deployer } = await getNamedAccounts()

  if (devChains.includes(network.name)) {
    log('Local network detected! Deploying mocks...')
    await deploy('MockV3Aggregator', {
      from: deployer,

      args: [DECIMALS, INITIAL_PRICE],
      log: true,
    })

    log('Mocks deployed!')
    log('------------------------------------')
  }
}

func.tags = ['all', 'mocks']
export default func
