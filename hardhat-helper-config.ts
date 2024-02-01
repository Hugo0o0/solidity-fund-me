const DECIMALS = 8
const INITIAL_PRICE = 200000000000
const devChains = ['hardhat', 'localhost']

const networkConfig = {
  sepolia: {
    address: '0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e',
    blockConfirmations: 6,
  },
}

export { DECIMALS, INITIAL_PRICE, devChains, networkConfig }
