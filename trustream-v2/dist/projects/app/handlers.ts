import _ from 'lodash'
import { deviceDataRepository, deviceRepository } from './models'
import { ProjectContext } from '../interface'
import { EthHelper } from "@helpers/index"
import {
  ecrecover,
  toBuffer
} from 'ethereumjs-util'
var ethUtil = require('ethereumjs-util');
import { publicKeyToAddress } from '@common/utils'
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

function verifyMessage(from : string, signature : string) {
  const message = 'Very Message Such Wow';
  try {
    // console.log('before call message', bops.from(message, 'utf8').toString('hex'));
    //   let msg = `0x${bops.from(message, 'utf8').toString('hex')}`;
      // data: 0x86,101,114,121,32,77,101,115,115,97,103,101,32,83,117,99,104,32,87,111,119
      // sig : 0x89611b02e3c84b624eaef17c1849ddc140aa691f4f7ce2711d81684775f15c8f748856766d67dd5abf42d0eb64d8ed0c289c60df2713b177a12a137f6722cfea1c
      // console.log('before call', msg, signature);
      // console.log('bops', bops.from);

      const msg = "0x86,101,114,121,32,77,101,115,115,97,103,101,32,83,117,99,104,32,87,111,119";

      const recoveredAddr = recoverPersonalSignature({data: msg, sig: signature,});
      console.log('recoveredAddr : ' + recoveredAddr);
      if (recoveredAddr.toLowerCase() === from.toLowerCase()) {
        return true;
          // console.log(`Successfully ecRecovered signer as ${recoveredAddr}`);
      } else {
          // console.log(`Failed to verify signer when comparing ${recoveredAddr} to ${from}`,);
        return false;
      }
  } catch (err) {
      console.error(err);
      return false;
  }
  return false;
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
  // console.log("Payload:")
  // console.log(decodedPayload)
  
  // First, recover the address from the message signature
  const message : any = JSON.stringify(decodedPayload.message)

  const signature = decodedPayload.signature

  let isValid: boolean = false

  isValid = verifyMessage(address, signature);
  
  if (isValid === false) {
    console.log(`WARNING: Dropping data message: Invalid signature. Recovered address doesn't match ${address}`)
  }

  const device = await deviceRepository.findByPk(address);
  
  if (!device) {
      console.log(`WARNING: Dropping data message: Device ${address} is not registered`)
      return null
  }

  console.log("Device is registered. Processing data")
  console.log(`Device address: ${address}`)
  console.log(`Heart rate: ${decodedPayload.message.heartRate}`)
  console.log(`Timestamp: ${decodedPayload.message.timestamp}`)

  await deviceDataRepository.upsert({
    id: address + '-' + decodedPayload.message.timestamp,
    address: address,
    heartRate: decodedPayload.message.heartRate,
    timestamp: decodedPayload.message.timestamp
  })
  // Store the data and execute some contracts (eg. rewards)
}

const handlers = {
  onDeviceRegistered,
  onMqttData,
}

export default handlers
