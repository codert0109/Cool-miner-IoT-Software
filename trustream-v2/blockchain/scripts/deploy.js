const { deployContract } = require('ethereum-waffle')

async function main() {
  let ContractInfo = {}
  let ContractObj = {}
  async function deployContract(name) {
    const Contract = await ethers.getContractFactory(name)
    let params = []
    for (let i = 1; i < arguments.length; i++) {
      params.push(arguments[i])
    }
    const contract = await Contract.deploy(...params)
    ContractInfo[name] = contract.address
    ContractObj[name] = contract

    console.log(
      `${name} Contract deployed at ${contract.address}, block:${contract.deployTransaction.blockNumber}`,
    )
    return contract
  }

  const [deployer] = await ethers.getSigners()

  console.log('Deploying contracts with the account:', deployer.address)

  let balanceRau = await deployer.getBalance()
  let balanceIOTX = balanceRau / Math.pow(10, 18)
  console.log('Account balance before deploy:', balanceIOTX, ' IOTX')

  await deployContract('DevicesRegistry')

  const init_token_supply = 10000
  const elumToken = await deployContract('ElumToken', init_token_supply)

  const normal_nft_supply = 1000
  const special_nft_supply = 1000
  const normal_nft_price = 3
  const special_nft_price = 5
  const nft = await deployContract(
    'NFT',
    elumToken.address,
    normal_nft_supply,
    normal_nft_price,
    special_nft_supply,
    special_nft_price,
  )

  balanceRau = await deployer.getBalance()
  balanceIOTX = balanceRau / Math.pow(10, 18)
  console.log('Account balance after deploy:', balanceIOTX, ' IOTX')

  await AddWhiteLists(ContractObj)
  saveFrontendFiles(ContractInfo)
}

async function loadFromFile(path) {
  const fs = require('fs')
  const readline = require('readline')
  const fileStream = fs.createReadStream(path)

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  })

  let ret = [];

  for await (const line of rl) {
    ret.push(line)
  }
  return ret
}

async function AddWhiteLists(ContractObj) {
  const NFTContract = ContractObj['NFT']

  const lists = await loadFromFile('testers/list.txt')

  await NFTContract.insertWhiteListArray(lists);

  // for (const wallet of lists) {
  //   await NFTContract.insertWhiteList(wallet)
  //   console.log(`Added to whitelist ${wallet}`)
  // }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })

function saveFrontendFiles(ContractInfo) {
  const fs = require('fs')
  const contractsDir = __dirname + '/../../dapp/frontend/src/contracts'

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir)
  }

  fs.writeFileSync(
    contractsDir + '/contract-address.json',
    JSON.stringify(ContractInfo, undefined, 2),
  )

  let contractNames = Object.keys(ContractInfo)

  for (let i = 0; i < contractNames.length; i++) {
    const contractName = contractNames[i]
    const ContractArtifact = artifacts.readArtifactSync(contractName)

    fs.writeFileSync(
      contractsDir + `/${contractName}.json`,
      JSON.stringify(ContractArtifact, null, 2),
    )
  }

  console.log('Saving to frontend success.')
}
