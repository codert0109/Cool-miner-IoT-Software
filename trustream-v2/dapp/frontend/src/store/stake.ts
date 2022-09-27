// implement web3 -> backend authentication
import { makeAutoObservable } from 'mobx';
import RootStore from './root';
import { publicConfig } from "../config/public";
import { getNFTIDFromAddress } from '../utils';

import ContractAddress from '../contracts/contract-address.json';
import StakeContractABI from '../contracts/ElumStaking.json';

export class StakeStore {
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
            address : ContractAddress.ElumStaking,
            abi : StakeContractABI.abi,
            method : method,
            params : [...params],
            options : options
        });
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

    async getStakingInfo(nftID) {
        const { god } = this.rootStore;
        try {
            let tx = await this.callContract('NFT_TO_INFO', [nftID]);
            return tx;
        } catch(err) {
            console.error('getStakingList return error', err, god.currentNetwork.account);
            return null;
        }
    }

    stakeNFT(nftID, stakeType) {
        return this.callContract('stakeNFT', [nftID, stakeType]);
    }
} 