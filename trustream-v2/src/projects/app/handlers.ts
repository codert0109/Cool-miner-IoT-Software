import _ from 'lodash'
import { 
  deviceDataRepository, 
  deviceRepository, 
  deviceAuthRepository,
  deviceUptimeRepository, 
  nftAuthRepository
} from './models'
import { ProjectContext } from '../interface'
// import { EthHelper } from "@helpers/index"
// import { ecrecover, toBuffer } from 'ethereumjs-util'
var ethUtil = require('ethereumjs-util');
// import { publicKeyToAddress } from '@common/utils'
var bops = require('bops');
import { recoverPersonalSignature } from "eth-sig-util";

async function onDeviceRegistered(context: ProjectContext, event: any,) {
  if (event)
  {
    const { _deviceAddress } = event.returnValues;
    console.log("Registered new device: ", _deviceAddress);
    await deviceRepository.upsert({
      address: _deviceAddress,
      status: 0
    })
  }
}

function buf2hex(buffer : ArrayBuffer) { // buffer is an ArrayBuffer
  return [...new Uint8Array(buffer)]
      .map(x => x.toString(16).padStart(2, '0'))
      .join('');
}

/*
- Old Version of Signature Verification Method

function verifyMessage(from : string, signature : string) {
  const message = 'Very Message Such Wow';
  try {
      const msg = "0x86,101,114,121,32,77,101,115,115,97,103,101,32,83,117,99,104,32,87,111,119";
      const recoveredAddr = recoverPersonalSignature({data: msg, sig: signature,});
      console.log('recoveredAddr : ' + recoveredAddr);
      if (recoveredAddr.toLowerCase() === from.toLowerCase()) {
        return true;
      } else {
        return false;
      }
  } catch (err) {
      console.error(err);
      return false;
  }
  return false;
}
*/

async function verifyMessage(nft_id : number, sessionID : string) {
  try {
    let result = await nftAuthRepository.findOne({ where : {nft_id, session_id : sessionID}})
    if (result === null)
      return false;
    return true;
  } catch (err) {
    console.log(`errors occured in verifyMessage ${err}`);
    return false;
  }
}

async function updateUpTime(address : string, nftID : string) {
  const UPLOAD_INTERVAL = 5 * 60;
  const UPLOAD_THRESMS = UPLOAD_INTERVAL * 1000 * 0.9;

  console.log('updateUpTime called');

  try {
    let result = await deviceDataRepository.findOne({ where : { nft_id : nftID }, order : [['upload_time', 'DESC']] })

    if (result === null) {
      // find new miner! add data
      await deviceUptimeRepository.create({ address, uptime : UPLOAD_INTERVAL});
      return true;
    } else {
      // update data
      let elapsedTime = Date.now() - new Date(result.upload_time).getTime();

      console.log('elapsedTime', elapsedTime);

      if (elapsedTime > UPLOAD_THRESMS) {
        let result = await deviceUptimeRepository.findOne({ where : { address }});
        if (result === null) {
          await deviceUptimeRepository.create({ address, uptime : UPLOAD_INTERVAL});
        } else {
          await deviceUptimeRepository.update(
            { address, uptime : result.uptime + UPLOAD_INTERVAL},
            { where : { address }});
        }
        return true;
      } else {
        console.log('blocked: data is uploading too fast.');
        return false;
      }
    }
  } catch (err) {
    console.log(`errors occured in updateUpTime ${err}`);
    return false;
  }
}

function checkVersion(min_version : string = '2.1.3', msg_version : string) {
  if (msg_version == null || msg_version == undefined) 
    return false;
  let a = min_version.split('.');
  let b = msg_version.split('.');
  for (let i = 0; i < 3; i++) {
    if (~~a > ~~b) return false;
    if (~~a < ~~b) return true;
  }
  return true;
}

async function onMqttData(context: ProjectContext, topic: string, payload: Buffer) {
  console.log("Received a message on topic: ", topic);
  
  // Check that the topic passed respect the format
  const values = /^\/device\/(0x[a-fA-F0-9]{40})\/data$/.exec(topic)
  if(!values) {
    console.log("Invalid topic, ignoring");
    return;
  }
  const address = values[1]

  // Decode the JSON message
  let decodedPayload = eval('('+payload.toString()+')');

  if (!checkVersion('2.1.3', decodedPayload.message.version)) {
    console.log("Discard message with version error, ", decodedPayload.message.version);
    return;
  }

  // console.log("Payload:")
  // console.log(decodedPayload)
  
  // First, recover the address from the message signature
  const message : any = JSON.stringify(decodedPayload.message)

  console.log('message', message);

  const signature = decodedPayload.signature

  let isValid: boolean = false

  let nftID = decodedPayload.message.nftID;

  if (nftID === undefined) {
    console.log(`WARNING: Dropping data message: message does not include NFT ID.`)
    return;
  }

  isValid = await verifyMessage(nftID, signature);
  
  if (isValid === false) {
    console.log(`WARNING: Dropping data message: Invalid session id ${address}`)
    return;
  }

  let NFTContract : any = context.getContract("NFT");
  
  let NFTBalance = await NFTContract.methods.balanceOf(address).call();
  let hasNFT = parseInt(NFTBalance.normalNFT) > 0;

  if (!hasNFT) {
    console.log('NFTBalance', NFTBalance);
    console.log(`WARNING: Dropping data message: Device ${address} has no NFT.`)
    return null
  }

  let { miner } = decodedPayload.message;

  if (miner == undefined) miner = 'Not set';

  let nounce = ~~(Math.random() * 100000);

  let result = true;

  if (nftID !== undefined) {
    result = await updateUpTime(address, nftID);
  } else {
    nftID = -1;
    console.log(`WARNING: Dropping data message: message does not include NFT ID.`)
    return null;
  }

  if (result == true) {
    await deviceDataRepository.upsert({
      address             : address,
      start_time          : decodedPayload.message.start_time,
      end_time            : decodedPayload.message.end_time,
      pedestrians         : decodedPayload.message.pedestrians,
      cars                : decodedPayload.message.cars,
      buses               : decodedPayload.message.bus,
      trucks              : decodedPayload.message.truck,
      total               : decodedPayload.message.total,
      link                : decodedPayload.message.link,
      upload_time         : Date.now(),
      miner,
      nft_id              : nftID
    })
  }

  // Store the data and execute some contracts (eg. rewards)
}

const handlers = {
  onDeviceRegistered,
  onMqttData,
}

export default handlers;