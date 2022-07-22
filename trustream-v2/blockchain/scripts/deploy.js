async function main() {
  const [deployer] = await ethers.getSigners()

  console.log('Deploying contracts with the account:', deployer.address)

  let balanceRau = await deployer.getBalance()
  let balanceIOTX = balanceRau / Math.pow(10, 18)
  console.log('Account balance:', balanceIOTX, ' IOTX')

  const DevicesRegistry = await ethers.getContractFactory('DevicesRegistry')
  const devicesRegistry = await DevicesRegistry.deploy()
  blockNumber = devicesRegistry.deployTransaction.blockNumber
  console.log('DevicesRegistry Contract')
  console.log('address:', devicesRegistry.address)
  console.log('block:', blockNumber)
  console.log('')

  const init_token_supply = 10000
  const ElumToken = await ethers.getContractFactory('ElumToken')
  const elumToken = await ElumToken.deploy(init_token_supply)
  console.log('ElumToken Contract')
  console.log('address:', elumToken.address)
  console.log('')

  const normal_nft_supply = 100
  const special_nft_supply = 50
  const normal_nft_price = 10
  const special_nft_price = 20
  const NFT = await ethers.getContractFactory('NFT')
  const nft = await NFT.deploy(
    elumToken.address,
    normal_nft_supply,
    normal_nft_price,
    special_nft_supply,
    special_nft_price,
  )
  console.log('NFT Contract')
  console.log('address:', nft.address)
  console.log('')

  saveFrontendFiles();
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })

function saveFrontendFiles(token, presaleToken) {
  const fs = require('fs')
  const contractsDir = __dirname + '/../dapp/frontend/src/contracts'

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir)
  }

  fs.writeFileSync(
    contractsDir + '/contract-address.json',
    JSON.stringify(
      {
        Token: token.address,
        PresaleToken: presaleToken.address,
        USDC: '0x4DBCdF9B62e891a7cec5A2568C3F4FAF9E8Abe2b',
      },
      undefined,
      2,
    ),
  )

  const TokenArtifact = artifacts.readArtifactSync('Token')

  fs.writeFileSync(
    contractsDir + '/Token.json',
    JSON.stringify(TokenArtifact, null, 2),
  )

  const PresaleTokenArtifact = artifacts.readArtifactSync('PresaleToken')

  fs.writeFileSync(
    contractsDir + '/PresaleToken.json',
    JSON.stringify(PresaleTokenArtifact, null, 2),
  )

  console.log('Saving to frontend success.')
}
