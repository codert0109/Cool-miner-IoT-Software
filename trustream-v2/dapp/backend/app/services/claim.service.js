const EPOCH_INTERVAL = 1 * 60 * 60 * 1000; // 3600s = 1h
const TIMER_INTERVAL = 5000;
const key_status = require('../controllers/key_status.controller');

let timerID = null;
let isPending = false;

const onResult = async () => {
    if (isPending) return;

    try {
        isPending = true;

        let result = await key_status.getValue('LAST_UPDATED_EPOCH');
        let last_updated = 0;
        if (result != null) last_updated = parseInt(result.value);

        let cur_epoch = ~~ (Date.now() / EPOCH_INTERVAL);

        if (cur_epoch == last_updated) {     // no need to work
            isPending = false;
            return;
        }
        
        await key_status.updateValue('LAST_UPDATED_EPOCH', cur_epoch);

        
        isPending = false;
    } catch (err) {
        console.log('errors occured in claim.service', err);
        isPending = false;
        return;
    }
};

exports.init = function() {
    if (timerID != null) {
        console.log('claim.service is already running');
        return;
    }
    timerID = setInterval(onResult, TIMER_INTERVAL);
};