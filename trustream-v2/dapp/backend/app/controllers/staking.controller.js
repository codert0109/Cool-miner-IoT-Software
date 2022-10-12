const claim_controller = require('./claim_token.controller');
const devicedata_controller = require('./device_data.controller');

const days = 86400;
const secs = 1;

const params = {
    level   : ['Bronze', 'Silver', 'Gold', 'Platinum', 'All Star'],
    amount  : [500, 1000, 1500, 2000, 2500],
    // period  : [45 * days, 90 * days, 180 * days, 360 * days],        // to deploy to main server
    // period_label : ['45 days', '90 days', '180 days', '360 days'],
    period  : [45 * secs, 90 * secs, 180 * secs, 360 * secs],           // to deploy to test server
    period_label : ['45s', '90s', '180s', '360s'],
    multiplier:    [[11000, 11500, 12500, 14000],
                    [12000, 13000, 14000, 15500],
                    [13500, 14500, 15500, 17000],
                    [15000, 16000, 17000, 18500],
                    [16500, 17500, 18500, 20000]]
};

exports.getStakingParameters = (req, res) => {
    res.json({
        status : 'OK',
        data : params
    })
}

exports.getMultiplier = async (address) => {
    let stakingInfo = await claim_controller.getStakingInfo(address);
    if (stakingInfo == null) 
        return 1;
    let amount = stakingInfo.amount;
    let period = stakingInfo.expireTime - stakingInfo.startTime;

    let activeMiner = await devicedata_controller.getActiveMinerCnt(address);
    if (activeMiner == 0) activeMiner = 1;

    amount = amount / activeMiner;

    let curMultiplier = 1;
    for (let i = 0; i < params.amount.length; i++) {
        for (let j = 0; j < params.period.length; j++) {
            if (params.period[j] <= period && params.amount[i] <= amount) {
                if (curMultiplier < params.multiplier[i][j])
                    curMultiplier = params.multiplier[i][j];
            }
        }
    }

    console.log('address', address, amount, period, activeMiner, curMultiplier)
    
    return curMultiplier;
};