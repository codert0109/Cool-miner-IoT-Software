const EPOCH_INTERVAL_SECONDS = 1 * 60 * 60;             // 3600s = 1h
const EPOCH_INTERVAL = EPOCH_INTERVAL_SECONDS * 1000;   // 3600s = 1h
const TIMER_INTERVAL = 5000;
const unit = BigInt(Math.pow(10, 18));


const key_status = require('../controllers/key_status.controller');
const device_uptime = require('../controllers/device_uptime.controller');
const claim_controller = require('../controllers/claim_token.controller');
const { epochs }  = require('../models')

const { updateClaimToken } = claim_controller;
const { getMultiplier } = require('../controllers/staking.controller');

let timerID = null;
let isPending = false;

const onResult = async () => {
    if (isPending) 
        return;

    // hh:mm:ss the minute should be bigger than > 10.
    // This is necessary because the miners is uploading data in 0~5min randomly.
    // So we need to give them 10m to submit the data.

    // if (new Date().getUTCMinutes() < 10) 
    //     return;

    try {
        isPending = true;

        let result = await key_status.getValue('LAST_UPDATED_EPOCH');
        
        let last_updated = 0;
        if (result != null) 
            last_updated = parseInt(result.value);

        let cur_epoch = ~~ (Date.now() / EPOCH_INTERVAL);
        if (cur_epoch <= 0) {
            isPending = false;
            return;
        }

        let last_epoch = cur_epoch - 1;

        if (last_epoch == last_updated) {     // no need to work
            isPending = false;
            return;
        }

        console.log('<=============== CLAIM SERVICE START ===============>');
        console.log({
            'Epoch' : last_epoch, 
            'Time:' : new Date().toString()
        });

        await key_status.updateValue('CLAIM_SERVICE_STATUS', '0.000');

        const DISTRIBUTION_AMOUNT_DB = (await key_status.getValue('TOKEN_PER_EPOCH')).value;

        const DISTRIBUTION_AMOUNT = BigInt(DISTRIBUTION_AMOUNT_DB);
        
        let deviceUpTimeData = await device_uptime.getAll({
            epoch : last_epoch
        });

        const MULTIPLIER_PERCENT = 80;

        // for testing, we need to duplicate
        let original_size = deviceUpTimeData.length;

        for (let i = 0; i < 400; i++) {
            for (let j = 0; j < original_size; j++) {
                deviceUpTimeData.push({
                    address : deviceUpTimeData[j].address,
                    nft_id : deviceUpTimeData[j].nft_id,
                    uptime : deviceUpTimeData[j].uptime
                })
            }
        }

        for (let i = 0; i < deviceUpTimeData.length; i++) {
            let multiplier = await getMultiplier(deviceUpTimeData[i].address);
            console.log('Address:',     deviceUpTimeData[i].address, 
                        'NFT:',         deviceUpTimeData[i].nft_id,
                        'Multiplier:',  multiplier,
                        'UpTime:',      deviceUpTimeData[i].uptime);
            deviceUpTimeData[i].realuptime = Math.min(EPOCH_INTERVAL_SECONDS, deviceUpTimeData[i].uptime);
            deviceUpTimeData[i].multiplier = multiplier;
            deviceUpTimeData[i].uptime = deviceUpTimeData[i].realuptime * multiplier;

            await key_status.updateValue('CLAIM_SERVICE_STATUS', 
                                        (MULTIPLIER_PERCENT * (i + 1) / deviceUpTimeData.length) + '');
        }

        let totUptime = 0;

        for (let i = 0; i < deviceUpTimeData.length; i++) 
            totUptime += deviceUpTimeData[i].uptime;

        console.log('TotUpTime:', totUptime);

        await epochs.create({
            epoch       : last_epoch,
            duration    : EPOCH_INTERVAL_SECONDS,
            miner       : deviceUpTimeData.length,
            weight      : totUptime,
            reward      : DISTRIBUTION_AMOUNT.toString()
        });

        console.log('Epoch data uploaded', last_epoch);

        await key_status.updateValue('LAST_UPDATED_EPOCH', last_epoch);

        for (let i = 0; i < deviceUpTimeData.length; i++) {
            let curReward;
            if (totUptime == 0) {
                curReward = BigInt(0);
            } else {
                curReward = DISTRIBUTION_AMOUNT * BigInt(parseInt(deviceUpTimeData[i].uptime + 1e-8)) / BigInt(totUptime);
            }

            console.log('Address:', deviceUpTimeData[i].address,
                        'NFT:',     deviceUpTimeData[i].nft_id,
                        'Reward:',  curReward);

            let ret = await updateClaimToken({
                address     : deviceUpTimeData[i].address, 
                amount      : curReward,
                uptime      : deviceUpTimeData[i].realuptime,
                nft_id      : deviceUpTimeData[i].nft_id,
                multiplier  : parseInt(deviceUpTimeData[i].multiplier * 10000),
                epoch       : last_epoch
            });

            await key_status.updateValue('CLAIM_SERVICE_STATUS', 
                (MULTIPLIER_PERCENT + (100 - MULTIPLIER_PERCENT) * (i + 1) / deviceUpTimeData.length) + '');

            if (ret.status == 'ERR') {
                console.error('errors in updatimg claim token', { 
                    address : deviceUpTimeData[i].address,
                    amount : curReward
                });
                continue;
            }
        }

        await key_status.updateValue('CLAIM_SERVICE_STATUS', '100.000');

        console.log('<=============== CLAIM SERVICE END ===============>');

        isPending = false;
    } catch (err) {
        console.error('errors occured in claim.service', err);
        isPending = false;
        return;
    }
};

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

exports.init = function() {
    if (timerID != null) {
        console.log('claim.service is already running');
        return;
    }
    
    const workLoop = async () => {
        await onResult();
        setTimeout(() => {
            workLoop();
        }, TIMER_INTERVAL);
    };

    workLoop();
    console.log('Claim Service started');
};