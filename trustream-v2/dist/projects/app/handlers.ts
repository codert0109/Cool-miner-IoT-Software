import _ from 'lodash'
import { 
  deviceDataRepository, 
  portalAuthRepository,
  deviceUptimeRepository, 
  nftAuthRepository,
  keystatusRepository,
  P
} from './models'
import { ProjectContext } from '../interface'
// import { EthHelper } from "@helpers/index"
// import { ecrecover, toBuffer } from 'ethereumjs-util'
var ethUtil = require('ethereumjs-util');
// import { publicKeyToAddress } from '@common/utils'
var bops = require('bops');
import { recoverPersonalSignature } from "eth-sig-util";

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

async function verifyMessage(address : string, nft_id : number, sessionID : string) {
  try {
    let result = await nftAuthRepository.findOne({ where : {address, nft_id, session_id : sessionID}})
    if (result === null)
      return false;
    return true;
  } catch (err) {
    console.log(`errors occured in verifyMessage ${err}`);
    return false;
  }
}

async function updateLocationTimestamp(location_id : string) {
  if (location_id === '' || location_id.length < 3)
    return false;
  if (location_id[0] !== 'P')
    return false;

  let table_id = parseInt(location_id[1]);
  let camera_id = parseInt(location_id.slice(2));

  if (table_id < 1) return false;
  
  -- table_id;

  if (table_id >= P.length)
    return false;
  
  try {
    await P[table_id].update(
      { timestamp : Math.floor(Date.now() / 1000)}, 
      { where : {id : camera_id} }
    )
  } catch (err) {
    console.log('errors occured', err);
    return false;
  }
  return true;
}

function getCurrentEpoch() {
  return ~~(Date.now() / 3600 / 1000);    // 1 hour
}

async function updateUpTime(address : string, nftID : string) {
  const UPLOAD_INTERVAL = 5 * 60;
  const UPLOAD_THRESMS = UPLOAD_INTERVAL * 1000 * 0.9;

  try {
    let result = await deviceDataRepository.findOne(
      { 
        where : { address, nft_id : nftID }, 
        order : [['upload_time', 'DESC']] 
      }
    )

    if (result !== null) {
      // update data
      let elapsedTime = Date.now() - new Date(result.upload_time).getTime();

      if (elapsedTime < 0)          // needs to update, please sync with database
        elapsedTime = 0;

      if (false && elapsedTime < UPLOAD_THRESMS) {
        console.log('blocked: data is uploading too fast.');
        return false;
      }
    }
        
    let current_epoch = getCurrentEpoch();
    let upload_record = await deviceUptimeRepository.findOne({ where : { address, epoch : current_epoch, nft_id : nftID }});
    if (upload_record === null) {
      await deviceUptimeRepository.create({ 
        address, 
        uptime : UPLOAD_INTERVAL,
        nft_id : nftID,
        epoch : current_epoch,
        multiplier : 0,
        reward : '0'
      });
    } else {
      await deviceUptimeRepository.update(
        { 
          address, 
          uptime : upload_record.uptime + UPLOAD_INTERVAL,
          epoch : current_epoch,
          nft_id : nftID,
          multiplier : 0,
          reward : '0'
        },
        { where : { address, epoch : current_epoch, nft_id : nftID }});
    }
    return true;
  } catch (err) {
    console.log(`errors occured in updateUpTime ${err}`);
    return false;
  }
}

async function checkVersion(msg_version : string) {
  if (msg_version == null || msg_version == undefined) 
    return false;

  let min_version : string = '2.1.3';
  try {
    let data = await keystatusRepository.findOne({ where : { key : 'REQUIRED_VERSION'}});
    if (data !== null) {
      min_version = data.value;
    } else {
      min_version = '1.0.0';
    }
  } catch (err) {
    console.error(err);
    return false;
  }
  let a = min_version.split('.');
  let b = msg_version.split('.');

  for (let i = 0; i < 3; i++) {
    let av = ~~a[i];
    let bv = ~~b[i];
    console.log({i, av, bv});
    if (av > bv) return false;
    if (av < bv) return true;
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

  if (!await checkVersion(decodedPayload.message.version)) {
    console.log("Discard message with version error, ", decodedPayload.message.version);
    return;
  }

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

  let location_id = decodedPayload.message.location_id;
  if (location_id === undefined) {
    console.log(`WARNING: Dropping data message: message does not include location_id.`)
    return;
  }

  isValid = await verifyMessage(address, nftID, signature);
  
  if (isValid === false) {
    console.log('WARNING: Dropping data message: Invalid session id', {address, nftID});
    return;
  }

  isValid = await updateLocationTimestamp(location_id);
  if (isValid === false) {
    console.log(`WARNING: Dropping data message: location_id is invalid ${location_id}`)
    return;    
  }

  // let NFTContract : any = context.getContract("NFT");
  // let NFTBalance = await NFTContract.methods.balanceOf(address).call();
  // let hasNFT = parseInt(NFTBalance.normalNFT) > 0;

  // if (!hasNFT) {
  //   console.log('NFTBalance', NFTBalance);
  //   console.log(`WARNING: Dropping data message: Device ${address} has no NFT.`)
  //   return null
  // }

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
      location_id         : decodedPayload.message.location_id,
      upload_time         : Date.now(),
      nft_id              : nftID
    })
  }

  // Store the data and execute some contracts (eg. rewards)
}

const handlers = {
  onMqttData,
}

export default handlers;