// implement web3 -> backend authentication
import { makeAutoObservable } from 'mobx';
import RootStore from './root';
import { publicConfig } from "../config/public";
import { getNFTIDFromAddress } from '../utils';

import ContractAddress from '../contracts/contract-address.json';
import TokenContractABI from '../contracts/ElumToken.json';

export class TokenStore {
    rootStore: RootStore;
    balance: string;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;

        makeAutoObservable(this, {
            rootStore: false
        });
    }

    callContract(method : string, params : Array<any>, options : Object = {}) {
        const { god } = this.rootStore;
        return god.currentNetwork.execContract({
            address : ContractAddress.ElumToken,
            abi : TokenContractABI.abi,
            method : method,
            params : [...params],
            options : options
        });
    }

    async getBalance() {
        // Should be update to use smart contracts.
        const { god } = this.rootStore;
        try {
            let tx = await this.callContract('balanceOf', [god.currentNetwork.account]);
            return tx.toString();
        } catch(err) {
            console.error('getBalance return error', err, god.currentNetwork.account);
            return '0';
        }
    }

    async getPrice() {
        // Should be update to use smart contracts.
        const { god } = this.rootStore;
        try {
            let tx = await this.callContract('tokenPrice', []);
            let value : number = Number(await tx);
            return value;
        } catch(err) {
            console.error('getPrice return error', err);
            return 0;
        }
    }

    buy(amount : Number, value : string) {
        return this.callContract('buyTokens', [amount], { value });
    }
} 