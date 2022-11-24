const TIMER_INTERVAL = 1000 * 60 * 10; // 10 minutes alert system
const db = require('../models')
const Profile = db.profiles

const claim_token = require('../controllers/claim_token.controller');
const device_data = require('../controllers/device_data.controller');
const email_auth = require('../controllers/email_auth.controller');
const alert = require('../controllers/alert.controller');

let timerID = null;

const EVENT_NOTMINING = 0;
const EVENT_NOTWORKING = 1;

const onScanAlert = async () => {
    const getAlertLevel = (timePassed) => {
        const levelThreshold = [3600, 3600 * 24, 3600 * 24 * 7];
        for (let i = levelThreshold.length - 1; i >= 0; i--) {
            if (levelThreshold[i] * 1000 <= timePassed)
                return i;
        }
        return -1;
    };

    Profile.findAll()
        .then((data) => {
            data.forEach(async (item) => {
                const { address, email } = item;

                if (email == null || email == '') 
                    return;

                let nftLists = await claim_token.getNFTCnt(address);
                let uploadTimes = await device_data.getLastUploadTime(address, nftLists);

                let events = await alert.getEvent({address});

                uploadTimes = uploadTimes.map(item => item ? item.upload_time : 0);
                uploadTimes = uploadTimes.map(item => Date.now() - item);

                // we need to working nft event
                console.log('info', address, email, nftLists, uploadTimes);

                let updateAlertList = [];

                const findEvent = (events, address, nft_id, type) => {
                    return events.find((item) => {
                        return item.address == address && item.nft_id == nft_id && item.type == type;
                    });
                };

                for (let i = 0; i < uploadTimes.length; i++) {
                    let nft_id = nftLists[i];

                    if (getAlertLevel(uploadTimes[i]) == -1) {
                        if (findEvent(events, address, nftLists[i], EVENT_NOTMINING)) {
                            await alert.removeEvent({ address, nft_id, type : EVENT_NOTMINING});
                        }
                        if (findEvent(events, address, nftLists[i], EVENT_NOTWORKING)) {
                            await alert.removeEvent({ address, nft_id, type : EVENT_NOTWORKING});
                        }
                    } else {
                        if (uploadTimes[i] == 0) {
                            let currentLevel = getAlertLevel(uploadTimes[i]);
                            let event1 = findEvent(events, address, nftLists[i], EVENT_NOTMINING);
                            if (event1.level < currentLevel) {
                                await alert.updateEvent({ address, nft_id, type : EVENT_NOTMINING, level : currentLevel});
                                updateAlertList.push({
                                    nft_id : nftLists[i],
                                    type : EVENT_NOTMINING,
                                    level : currentLevel
                                });
                            }
                        } else {
                            let currentLevel = getAlertLevel(uploadTimes[i]);
                            let event1 = findEvent(events, address, nftLists[i], EVENT_NOTWORKING);
                            if (event1 == null) {
                                await alert.createEvent({ address, nft_id, type : EVENT_NOTWORKING, level : currentLevel});
                                updateAlertList.push({
                                    nft_id : nft_id,
                                    type : EVENT_NOTWORKING,
                                    level : currentLevel
                                })
                            } else {
                                if (event1.level < currentLevel) {
                                    await alert.updateEvent({ address, nft_id, type : EVENT_NOTWORKING, level : currentLevel});
                                    updateAlertList.push({
                                        nft_id : nft_id,
                                        type : EVENT_NOTWORKING,
                                        level : currentLevel
                                    })
                                }
                            }
                        }
                    }
                }

                const createContent = (alertList) => {
                    let content = '';
                    for (let i = 0; i < alertList.length; i++) {
                        if (alertList[i].type == EVENT_NOTMINING) {
                            content += `<p>Your NFT ${alertList[i].nft_id} did not start mining yet.</p>`
                        } else if (alertList[i].type == EVENT_NOTWORKING) {
                            let levelCaption = ['1 hour', '1 day', '1 week']
                            content += `<p>Your NFT ${alertList[i].nft_id} has been offline more than ${levelCaption[alertList[i].level]}.</p>`
                        }
                    }

                    content += '<p>Please start mining to get more tokens.</p>'
                    return content;
                };

                if (updateAlertList.length > 0) {
                    email_auth.sendMail({
                        receiver : email,
                        subject : 'Elumicate Mining Alert',
                        content : createContent(updateAlertList)
                    })
                }
            });
        })
        .catch((err) => {
            console.error('onScanAlert error', err);
        });
};

exports.init = function() {

    if (timerID != null) {
        console.log('alert.service is already running');
        return;
    }
    
    const workLoop = async () => {
        await onScanAlert();
        setTimeout(() => {
            workLoop();
        }, TIMER_INTERVAL);
    };
    
    workLoop();
    console.log('Alert Service started');
};