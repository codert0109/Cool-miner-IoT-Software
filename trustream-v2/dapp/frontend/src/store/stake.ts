// implement web3 -> backend authentication
import { makeAutoObservable } from 'mobx';
import RootStore from './root';
import { publicConfig } from "../config/public";
import { getNFTIDFromAddress } from '../utils';

import ContractAddress from '../contracts/contract-address.json';
import StakeContractABI from '../contracts/ElumStaking.json';

export class StakeStore {
    rootStore: RootStore;
    balance: string = '0';
    staked_tokens : string = '0';
    loading : boolean = true;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;

        makeAutoObservable(this, {
            rootStore: false
        });
    }

    callContract(method : string, params : Array<any>, options : Object = {}) {
        const { god } = this.rootStore;
        return god.currentNetwork.execContract({
            address : ContractAddress.ElumStaking,
            abi : StakeContractABI.abi,
            method : method,
            params : [...params],
            options : options
        });
    }

    async refresh() {
        const { god } = this.rootStore;
        try {
            this.loading = true;
            let tx : any = await this.callContract('ADDRESS_TO_INFO', [god.currentNetwork.account]);
            this.staked_tokens = String(tx.amount);
        } catch (err) {
            this.staked_tokens = '0';
            console.error('stake.refresh error', err);
        } finally {
            this.loading = false;
        }
    }

    async getStakingList() {
        // Should be update to use smart contracts.
        const { god } = this.rootStore;
        try {
            let tx = await this.callContract('getStakeTypeList', []);
            return tx;
        } catch(err) {
            console.error('getStakingList return error', err, god.currentNetwork.account);
            return [];
        }
    }

    async getStakingInfo() {
        const { god } = this.rootStore;
        try {
            let tx = await this.callContract('ADDRESS_TO_INFO', [god.currentNetwork.account]);
            return tx;
        } catch(err) {
            console.error('getStakingList return error', err, god.currentNetwork.account);
            return null;
        }
    }

    stake(stakeType, amount) {
        return this.callContract('stake', [stakeType, amount]);
    }
} 