import { ethers, run } from 'hardhat'

const verify = async (contractAddress: string, args: any) => {
  try {
    await run('verify:verify', {
      address: contractAddress,
      constructorArguments: args,
    })
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

export default verify
