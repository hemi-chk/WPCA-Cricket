const hre = require('hardhat')

async function main() {
  const [deployer] = await hre.ethers.getSigners()
  console.log('Deploying with account:', deployer.address)

  const balance = await hre.ethers.provider.getBalance(deployer.address)
  console.log('Account balance:', hre.ethers.formatEther(balance), 'ETH')

  const WPCACricket = await hre.ethers.getContractFactory('WPCACricket')
  const contract    = await WPCACricket.deploy()
  await contract.waitForDeployment()

  const address = await contract.getAddress()
  console.log('\n✓ WPCACricket deployed to:', address)
  console.log('\nAdd this to apps/api/.env:')
  console.log(`CONTRACT_ADDRESS=${address}`)
}

main().catch(err => { console.error(err); process.exit(1) })
