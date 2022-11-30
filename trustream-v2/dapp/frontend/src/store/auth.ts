// implement web3 -> backend authentication
import $ from 'axios';
import { makeAutoObservable } from 'mobx';
import RootStore from './root';
import { publicConfig } from "../config/public";
import { NetworkState } from './lib/NetworkState';
const { BACKEND_URL } = publicConfig;

const SESSION_NAME = 'elum_session';
const { ethereum } = require('../global.js').getWindow();

import Swal from 'sweetalert2';


export class AuthStore {
    rootStore: RootStore;
    getNounce_handler : any = null;
    ethereum_request_handler : any = null;
    getSessionID_handler : any = null;


    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;

        makeAutoObservable(this, {
            rootStore: false
        });
    }

    check_session(address, session, success_callback, fail_callback) {
        $.post(`${BACKEND_URL}/api/portal_auth/verify`, {
            address,
            signature: session
        }).then((data: any) => {
            let info: any = data.data;
            if (info.status == 'OK') {
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
                let ret = await $.post(`${BACKEND_URL}/api/portal_auth/getNounce`, {
                    address: god.currentNetwork.account
                });
                return ret.data.nounce;
            } catch (err) {
                return null;
            }
        }

        const getSessionID = async (password) => {
            try {
                let ret = await $.post(`${BACKEND_URL}/api/portal_auth/login`, {
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
                if (this.ethereum_request_handler == null) {
                    let sign_message = 
                        `Welcome to Elumicate!\n\nPlease Sign to access private information.\n\nThis request will not trigger a blockchain transaction or cost any gas fees.\n\nWallet address:\n${god.currentNetwork.account}\n\nNonce:\n${message}`;

                    // this.ethereum_request_handler = ethereum.request({
                    //     method: 'personal_sign',
                    //     params: [message, from, 'Random text'],
                    // });

                    this.ethereum_request_handler = ethereum.request({
                        method: 'personal_sign',
                        params: [sign_message, from, 'Random text'],
                    });
                } 
                const sign = await this.ethereum_request_handler;
                console.log('sign ended', sign);
                this.ethereum_request_handler = null;
                return sign;
            } catch (err) {
                console.log('sign ended with error');
                console.error(err);
                this.ethereum_request_handler = null;
                return null;
            }
        }

        // starting point of function

        if (this.getNounce_handler == null) {
            this.getNounce_handler = getNounce();
        }
        const nounce = await this.getNounce_handler;
        this.getNounce_handler = null;

        if (nounce == null) {
            fail_callback();
            return;
        }

        const signature = await signMessage(nounce);

        console.log('signature returned', signature);

        if (signature !== null) {
            if (this.getSessionID_handler == null) {
                this.getSessionID_handler = getSessionID(signature);
            }
            let sessionID = await this.getSessionID_handler;

            if (sessionID == null) {
                fail_callback();
                return;
            }

            this.saveSession(sessionID);
            success_callback();
        } else {
            fail_callback();
        }
    }

    saveSession(session: string) {
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

    /**
     * This function checks authentication first and if it is valid, asked users to authenticate for the first time.
     */
    actionWithAuth(callback) {
        this.check_auth(
            () => {
                callback();
            },
            () => {
                Swal.fire({
                    title: 'Error',
                    html: `<p>You need to login to use admin functions.</p>`,
                    icon: 'error',
                    showCancelButton: true
                }).then((result) => {
                    if (!result.isConfirmed)
                        return;
                    this.login(
                        () => {
                            callback();
                        },
                        () => {
                            Swal.fire({
                                title: 'Error',
                                html: `<p>Errors Occured.</p>`,
                                icon: 'error',
                            });
                        });
                }).catch(() => {
                    Swal.fire({
                        title: 'Info',
                        html: `<p>Action has been cancelled</p>`,
                        icon: 'info',
                    });
                });
            }
        );
    }

    $() {
        const { god } = this.rootStore;
        let sessionID = this.loadSession();
        if (sessionID != null) {
            $.defaults.headers.common['Authorization'] = sessionID;
        }
        if (god.currentNetwork.account != null) {
            $.defaults.headers.common['address'] = god.currentNetwork.account;
        }
        return $;
    }
}