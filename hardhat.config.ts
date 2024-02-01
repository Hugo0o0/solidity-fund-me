import { HardhatUserConfig } from 'hardhat/config'
import '@nomicfoundation/hardhat-toolbox'
import 'hardhat-deploy'

import 'dotenv/config'

const {
  PRIVATE_KEY = '',
  ETHERSCAN_API_KEY,
  LOCAL_NETWORK_URL,
  RPC_URL,
} = process.env

const config: HardhatUserConfig = {
  solidity: {
    compilers: [{ version: '0.8.19' }, { version: '0.6.6' }],
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  networks: {
    sepolia: {
      url: RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 11155111,
    },

    localhost: {
      url: LOCAL_NETWORK_URL,
      chainId: 31337,
    },
  },

  namedAccounts: {
    deployer: {
      default: 0,
    },
  },

  gasReporter: {
    enabled: true,
    outputFile: 'reports/gasReporter.log',
    noColors: true,
    currency: 'USD',
  },
}

export default config
