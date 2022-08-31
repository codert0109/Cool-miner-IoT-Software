// implement web3 -> backend authentication
import $ from 'axios';
import { makeAutoObservable } from 'mobx';
import RootStore from './root';
import { publicConfig } from "../config/public";
import { NetworkState } from './lib/NetworkState';

const SESSION_NAME = 'elum_session';
const { ethereum } = require('../global.js').getWindow();

export class AuthStore {
    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;

        makeAutoObservable(this, {
            rootStore: false
        });
    }

    check_session(address, session, success_callback, fail_callback) {
        $.post('https://miner.elumicate.com/api/device_auth/verify', {
            address,
            signature: session
        }).then((data: any) => {
            if (data.status == 'OK') {
                success_callback();
            } else {
                fail_callback();
            }
        }).catch(() => {
            fail_callback();
        });
    }

    async login(success_callback, fail_callback) {
        const { god } = this.rootStore;

        const getNounce = async () => {
            try {
                let ret = await $.post('https://miner.elumicate.com/api/device_auth/getNounce', {
                    address: god.currentNetwork.account
                });
                return ret.data.nounce;
            } catch (err) {
                return null;
            }
        }

        const getSessionID = async (password) => {
            try {
                let ret = await $.post('https://miner.elumicate.com/api/device_auth/login', {
                    address: god.currentNetwork.account,
                    password: password
                });
                return ret.data.session;
            } catch (err) {
                return null;
            }
        }

        const signMessage = async (message) => {
            const globalAccount = (god.currentNetwork as NetworkState).account;
            try {
                const from = globalAccount;
                const sign = await ethereum.request({
                    method: 'personal_sign',
                    params: [message, from, 'Random text'],
                });
                return sign;
            } catch (err) {
                console.error(err);
                return null;
            }
        }

        // starting point of function
        const nounce = await getNounce();
        if (nounce == null) {
            fail_callback();
        }

        const url = `${publicConfig.DEVICE_URL}/set_signature`;
        const signature = await signMessage(nounce);

        if (signature !== null) {
            let sessionID = await getSessionID(signature);
            
            if (sessionID == null) {
                fail_callback();
            }

            this.saveSession(sessionID);
            success_callback();
        } else {
            fail_callback();
        }
    }

    saveSession(session : string) {
        localStorage.setItem(SESSION_NAME, session);
    }

    loadSession() {
        return localStorage.getItem(SESSION_NAME);
    }

    check_auth(success_callback, fail_callback) {
        const { god } = this.rootStore;

        let address = god.currentNetwork.account;

        let sessionID = this.loadSession();
        if (sessionID == null) {
            fail_callback();
        } else {
            this.check_session(address, sessionID,
                () => {
                    success_callback();
                },
                () => {
                    localStorage.removeItem(SESSION_NAME);
                    fail_callback();
                })
        }
    }
}