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

async function main() {
  const [deployer] = await ethers.getSigners()

  console.log('Deploying contracts with the account:', deployer.address)

  let balanceRau = await deployer.getBalance()
  let balanceIOTX = balanceRau / Math.pow(10, 18)
  console.log('Account balance before deploy:', balanceIOTX, ' IOTX')

  const elumToken = await deployContract('ElumToken', "100000000000000000")
  const elumNFT = await deployContract('ElumNFT')

  await elumNFT.setTokenAddress(elumToken.address);
  await elumNFT.addNewType( 'https://testminer.elumicate.com/api/metadata/NFT/{id}.json', 
                            "3000000000000000000");
  await elumNFT.mint([0], [1000]);

  const elumStaking = await deployContract('ElumStaking');
  await elumStaking.setTokenAddress(elumToken.address);
  await elumStaking.setNFTAddress(elumNFT.address);
  const days = 24 * 60 * 60;
  await elumStaking.addStakeTypeList([45*days,  90*days,  180*days, 360*days, 
                                      45*days,  90*days,  180*days, 360*days,
                                      45*days,  90*days,  180*days, 360*days,
                                      45*days,  90*days,  180*days, 360*days,
                                      45*days,  90*days,  180*days, 360*days], 
                                     [500,      500,      500,      500,
                                      1000,     1000,     1000,     1000,
                                      1500,     1500,     1500,     1500,
                                      2000,     2000,     2000,     2000,
                                      2500,     2500,     2500,     2500], 
                                     [11000,    11500,    12500,    14000,
                                      12000,    13000,    14000,    15500,
                                      13500,    14500,    15500,    17000,
                                      15000,    16000,    17000,    18500,
                                      16500,    17500,    18500,    20000]);

  balanceRau = await deployer.getBalance()
  balanceIOTX = balanceRau / Math.pow(10, 18)
  console.log('Account balance after deploy:', balanceIOTX, ' IOTX')

  // await AddWhiteLists(ContractObj)
  saveFrontendFiles(ContractInfo)
}

async function testCapacity() {
  const testCapacity = await deployContract(
    'TestCapacity'
  );
  const testContract = ContractObj['TestCapacity'];

  const n = 600;

  let addressList = [];
  let balanceList = [];

  for (let i = 0; i < n; i++) {
    addressList.push('0xC332AE62518fB7B88F8C05470265f71a4fD7dC2f');
    balanceList.push(~~(Math.random() * 1000));
  }

  await testContract.addRewardTransactions(addressList, balanceList)
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

  for (const wallet of lists) {
    await NFTContract.insertWhiteList(wallet)
    console.log(`Added to whitelist ${wallet}`)
  }
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
