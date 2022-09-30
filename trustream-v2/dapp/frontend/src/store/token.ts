// implement web3 -> backend authentication
import { makeAutoObservable } from 'mobx';
import RootStore from './root';
import { publicConfig } from "../config/public";
import { getNFTIDFromAddress } from '../utils';

import ContractAddress from '../contracts/contract-address.json';
import TokenContractABI from '../contracts/ElumToken.json';

export class TokenStore {
    rootStore   : RootStore;
    balance     : string = '0';
    price       : number = 0;
    loading     : boolean = true;

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

    async refresh() {
        try {
            this.loading = true;
            this.balance = await this.getBalance();
            this.price = await this.getPrice();
            this.price /= Math.pow(10, 18);
        } catch (err) {
            console.log('token.refresh error', err);
        } finally {
            this.loading = false;
        }
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

    async transfer(address, amount) {
        return this.callContract('transfer', [address, amount]);
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

    allowToken(to, amount) {
        return this.callContract('approve', [to, amount]);
    }

    buy(amount : Number, value : string) {
        return this.callContract('buyTokens', [amount], { value });
    }
} 