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

  const elumToken = await deployContract('ElumToken', "10000000000000000") // set 0.01IoTx=1ElumToken
  const elumNFT = await deployContract('ElumNFT')

  await elumNFT.setTokenAddress(elumToken.address);
  await elumNFT.addNewType( 'https://testminer.elumicate.com/api/metadata/NFT/{id}.json', 
                            "3000000000000000000");
  await elumNFT.mint([0], [1000]);

  const elumStaking = await deployContract('ElumStaking');
  await elumStaking.setTokenAddress(elumToken.address);

  // for deploy to main server (45 days, 90 days, 180 seconds, 360 seconds)
  // const days = 24 * 60 * 60;
  // await elumStaking.addStakeTypeList([45*days,  90*days,  180*days, 360*days], ['45', '90', '180', '360']);

  // for deploy to test server (45 seconds, 90 seconds, 180 seconds, 360 seconds)
  await elumStaking.addStakeTypeList([45,  90,  180, 360], ['45', '90', '180', '360']);

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

    addressList.push('0xC332AE62518fB7B88F8C05470265f71a4fD7dC2f');
    n = 700;    
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
